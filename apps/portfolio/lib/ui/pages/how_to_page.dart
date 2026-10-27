import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:flutter_markdown_plus/flutter_markdown_plus.dart';
import 'package:url_launcher/url_launcher.dart';
import '../../models/data_model.dart';
import '../../models/howto_model.dart';
import '../design_tokens.dart';
import '../widgets/doc_layout.dart';
import '../widgets/contact_card.dart';

class HowToPage extends StatelessWidget {
  final String appId;

  const HowToPage({super.key, required this.appId});

  @override
  Widget build(BuildContext context) {
    final dataModel = Provider.of<DataModel>(context);
    final howtoIndex = Provider.of<HowtoIndexModel>(context);
    final app = dataModel.apps.firstWhere(
      (a) => a.id == appId,
      orElse: () => AppModel(
        id: 'error', name: 'App Not Found', shortDescription: '', fullDescription: '',
        iconUrl: '', tags: [], features: [], technicalDetails: [], screenshots: [],
        links: [], privacyPolicy: AppPolicy(url: '', features: []), termsAndConditions: AppPolicy(url: '', features: []),
      ),
    );

    if (app.id == 'error') {
      return Scaffold(body: Center(child: Text('App Not Found', style: NiType.heroH1(context))));
    }

    final howtoApp = howtoIndex.apps.firstWhere(
      (a) => a.id == appId,
      orElse: () => HowtoAppModel(id: '', title: ''),
    );

    // Prefer the new topic-based content when this app has a published
    // howto.json entry with features; otherwise fall back to the legacy
    // app.features/sections rendering (other apps may not have howto.json
    // entries yet).
    final useTopicLayout = howtoApp.features.isNotEmpty;

    return NiApp(
      appId: app.id,
      child: useTopicLayout
          ? _HowToTopicPageContent(app: app, howtoApp: howtoApp)
          : _HowToPageContent(app: app),
    );
  }
}

// ---------------------------------------------------------------------------
// Legacy rendering path (app.features / sections from data.json)
// ---------------------------------------------------------------------------

class _HowToPageContent extends StatelessWidget {
  final AppModel app;

  const _HowToPageContent({required this.app});

  @override
  Widget build(BuildContext context) {
    final title = 'How to use ${app.name}';
    final tocItems = app.features.map((f) => f.title).toList();
    final tokens = NiTokens.of(context);

    return DocLayout(
      title: title,
      tocItems: tocItems,
      sections: app.features.map((f) => Container(
        decoration: BoxDecoration(
          border: Border(
            left: BorderSide(color: tokens.surface2, width: 2), // The timeline track
          ),
        ),
        child: _TimelineStep(feature: f),
      )).toList(),
      bottomContent: const Padding(
        padding: EdgeInsets.only(top: 64),
        child: ContactCard(isSmall: true),
      ),
    );
  }
}

class _TimelineStep extends StatelessWidget {
  final AppFeature feature;

  const _TimelineStep({required this.feature});

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);

    return Stack(
      clipBehavior: Clip.none,
      children: [
        // The node
        Positioned(
          left: -13, // center on the 2px border
          top: 0,
          child: Container(
            width: 24,
            height: 24,
            decoration: BoxDecoration(
              color: tokens.surface,
              shape: BoxShape.circle,
              border: Border.all(color: tokens.accent, width: 2),
            ),
          ),
        ),
        // The content
        Padding(
          padding: const EdgeInsets.only(left: 32, bottom: 48),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(feature.title, style: NiType.timelineH2(context)),
              const SizedBox(height: 16),
              ...feature.sections.map((sec) => Padding(
                padding: const EdgeInsets.only(bottom: 24),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    if (sec.title.isNotEmpty) ...[
                      Text(sec.title, style: NiType.h3(context)),
                      const SizedBox(height: 16),
                    ],
                    MarkdownBody(
                      data: sec.content,
                      styleSheet: MarkdownStyleSheet(
                        p: NiType.doc(context).copyWith(height: 1.6),
                        pPadding: const EdgeInsets.only(bottom: 16),
                      ),
                      onTapLink: (text, href, title) {
                        if (href != null) launchUrl(Uri.parse(href));
                      },
                    ),
                    if (sec.images.isNotEmpty) ...[
                      const SizedBox(height: 16),
                      ...sec.images.map((img) => Container(
                        margin: const EdgeInsets.only(bottom: 16),
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(14),
                          border: Border.all(color: tokens.surface2, width: 1),
                        ),
                        child: ClipRRect(
                          borderRadius: BorderRadius.circular(13),
                          child: Image.asset('assets/placeholders/learning.webp'), // Uses placeholder
                        ),
                      )),
                    ],
                  ],
                ),
              )),
            ],
          ),
        ),
      ],
    );
  }
}

// ---------------------------------------------------------------------------
// Topic-based rendering path (assets/howto.json)
// ---------------------------------------------------------------------------

class _TopicEntry {
  final HowtoFeatureModel feature;
  final HowtoTopicModel topic;
  _TopicEntry({required this.feature, required this.topic});
}

class _HowToTopicPageContent extends StatefulWidget {
  final AppModel app;
  final HowtoAppModel howtoApp;

  const _HowToTopicPageContent({required this.app, required this.howtoApp});

  @override
  State<_HowToTopicPageContent> createState() => _HowToTopicPageContentState();
}

class _HowToTopicPageContentState extends State<_HowToTopicPageContent> {
  late List<_TopicEntry> _flatTopics;
  late Map<String, GlobalKey> _topicKeys;

  @override
  void initState() {
    super.initState();
    _buildTopicIndex();
  }

  @override
  void didUpdateWidget(covariant _HowToTopicPageContent oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.howtoApp.id != widget.howtoApp.id) {
      _buildTopicIndex();
    }
  }

  void _buildTopicIndex() {
    final flat = <_TopicEntry>[];
    for (final feature in widget.howtoApp.features) {
      final sortedTopics = [...feature.topics]
        ..sort((a, b) => a.title.toLowerCase().compareTo(b.title.toLowerCase()));
      for (final topic in sortedTopics) {
        flat.add(_TopicEntry(feature: feature, topic: topic));
      }
    }
    _flatTopics = flat;
    _topicKeys = {
      for (final entry in flat) entry.topic.id: GlobalKey(),
    };
  }

  String? _titleForTopicId(String id) {
    for (final entry in _flatTopics) {
      if (entry.topic.id == id) return entry.topic.title;
    }
    return null;
  }

  void _scrollToTopic(String id) {
    final key = _topicKeys[id];
    final ctx = key?.currentContext;
    if (ctx != null) {
      Scrollable.ensureVisible(
        ctx,
        duration: const Duration(milliseconds: 350),
        curve: Curves.easeInOut,
        alignment: 0.1,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final title = 'How to use ${widget.app.name}';
    final tocItems = _flatTopics.map((e) => e.topic.title).toList();
    // Only show a feature-title heading above the first topic of each group
    // when there's more than one feature — today there's just "Events".
    final showFeatureHeadings = widget.howtoApp.features.length > 1;

    String? prevFeatureId;
    final sections = <Widget>[];
    for (final entry in _flatTopics) {
      final isNewGroup = showFeatureHeadings && entry.feature.id != prevFeatureId;
      sections.add(_TopicSection(
        key: ValueKey(entry.topic.id),
        feature: entry.feature,
        topic: entry.topic,
        showFeatureHeading: isNewGroup,
        topicKey: _topicKeys[entry.topic.id]!,
        titleForTopicId: _titleForTopicId,
        onReferenceTap: _scrollToTopic,
      ));
      prevFeatureId = entry.feature.id;
    }

    return DocLayout(
      title: title,
      tocItems: tocItems,
      sections: sections,
      bottomContent: const Padding(
        padding: EdgeInsets.only(top: 64),
        child: ContactCard(isSmall: true),
      ),
    );
  }
}

class _TopicSection extends StatelessWidget {
  final HowtoFeatureModel feature;
  final HowtoTopicModel topic;
  final bool showFeatureHeading;
  final GlobalKey topicKey;
  final String? Function(String id) titleForTopicId;
  final void Function(String id) onReferenceTap;

  const _TopicSection({
    super.key,
    required this.feature,
    required this.topic,
    required this.showFeatureHeading,
    required this.topicKey,
    required this.titleForTopicId,
    required this.onReferenceTap,
  });

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);

    final validReferences = topic.references
        .map((id) => MapEntry(id, titleForTopicId(id)))
        .where((e) => e.value != null)
        .toList();

    return Container(
      key: topicKey,
      padding: const EdgeInsets.only(bottom: 48),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (showFeatureHeading) ...[
            Text(feature.title, style: NiType.h2(context)),
            const SizedBox(height: 24),
          ],
          Text(topic.title, style: NiType.h3(context)),
          const SizedBox(height: 16),
          ...topic.steps.map((step) => Padding(
            padding: const EdgeInsets.only(bottom: 10),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Padding(
                  padding: const EdgeInsets.only(top: 9, right: 12),
                  child: Container(
                    width: 6,
                    height: 6,
                    decoration: BoxDecoration(
                      color: tokens.muted,
                      shape: BoxShape.circle,
                    ),
                  ),
                ),
                Expanded(
                  child: MarkdownBody(
                    data: step,
                    styleSheet: MarkdownStyleSheet(
                      p: NiType.doc(context).copyWith(height: 1.6),
                      pPadding: EdgeInsets.zero,
                      code: NiType.doc(context).copyWith(
                        fontFamily: 'monospace',
                        fontSize: 13,
                        backgroundColor: tokens.surface2,
                      ),
                    ),
                    onTapLink: (text, href, title) {
                      if (href != null) launchUrl(Uri.parse(href));
                    },
                  ),
                ),
              ],
            ),
          )),
          if (topic.images.isNotEmpty) ...[
            const SizedBox(height: 8),
            ...topic.images.map((img) => Container(
              margin: const EdgeInsets.only(bottom: 16, top: 8),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: tokens.surface2, width: 1),
              ),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(13),
                child: Image.asset(img.url),
              ),
            )),
          ],
          if (validReferences.isNotEmpty) ...[
            const SizedBox(height: 8),
            Wrap(
              crossAxisAlignment: WrapCrossAlignment.center,
              spacing: 8,
              runSpacing: 8,
              children: [
                Text('See also:', style: NiType.muted(context, 13.76)),
                ...validReferences.map((e) => _SeeAlsoChip(
                  label: e.value!,
                  onTap: () => onReferenceTap(e.key),
                )),
              ],
            ),
          ],
        ],
      ),
    );
  }
}

class _SeeAlsoChip extends StatefulWidget {
  final String label;
  final VoidCallback onTap;

  const _SeeAlsoChip({required this.label, required this.onTap});

  @override
  State<_SeeAlsoChip> createState() => _SeeAlsoChipState();
}

class _SeeAlsoChipState extends State<_SeeAlsoChip> {
  bool _isHovered = false;

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    return MouseRegion(
      onEnter: (_) => setState(() => _isHovered = true),
      onExit: (_) => setState(() => _isHovered = false),
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        onTap: widget.onTap,
        child: AnimatedContainer(
          duration: NiTokens.hoverFast,
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
          decoration: BoxDecoration(
            color: _isHovered ? tokens.surface2 : tokens.surface,
            borderRadius: NiTokens.pill,
            border: Border.all(color: tokens.border),
          ),
          child: Text(
            widget.label,
            style: NiType.chip(context).copyWith(
              color: _isHovered ? tokens.accent : tokens.muted,
            ),
          ),
        ),
      ),
    );
  }
}
