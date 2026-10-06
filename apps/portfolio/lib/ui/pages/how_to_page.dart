import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:flutter_markdown_plus/flutter_markdown_plus.dart';
import 'package:url_launcher/url_launcher.dart';
import '../../models/data_model.dart';
import '../design_tokens.dart';
import '../widgets/doc_layout.dart';
import '../widgets/contact_card.dart';

class HowToPage extends StatelessWidget {
  final String appId;

  const HowToPage({super.key, required this.appId});

  @override
  Widget build(BuildContext context) {
    final dataModel = Provider.of<DataModel>(context);
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

    return NiApp(
      appId: app.id,
      child: _HowToPageContent(app: app),
    );
  }
}

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
