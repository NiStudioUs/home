import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:flutter_markdown_plus/flutter_markdown_plus.dart';
import 'package:url_launcher/url_launcher.dart';
import '../../models/data_model.dart';
import '../../services/current_app_service.dart';
import '../design_tokens.dart';
import '../widgets/doc_layout.dart';
import '../widgets/contact_card.dart';

class LegalPage extends StatelessWidget {
  final AppModel app;
  final PageType pageType;
  final String title;
  final List<AppFeature> features;

  const LegalPage({
    super.key,
    required this.app,
    required this.pageType,
    required this.title,
    required this.features,
  });

  @override
  Widget build(BuildContext context) {
    return NiApp(
      appId: app.id,
      child: _LegalPageContent(
        title: title,
        features: features,
        app: app,
        pageType: pageType,
      ),
    );
  }
}

class _LegalPageContent extends StatelessWidget {
  final String title;
  final List<AppFeature> features;
  final AppModel app;
  final PageType pageType;

  const _LegalPageContent({
    required this.title,
    required this.features,
    required this.app,
    required this.pageType,
  });

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    
    String? lastUpdated;
    if (pageType == PageType.privacy) {
      lastUpdated = app.privacyPolicy.lastUpdatedUtc;
    } else if (pageType == PageType.terms) {
      lastUpdated = app.termsAndConditions.lastUpdatedUtc;
    }
    
    String subtitle = 'For ${app.name}';
    if (lastUpdated != null && lastUpdated.isNotEmpty) {
      try {
        final d = DateTime.parse(lastUpdated);
        final months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        subtitle += ' · Last updated: ${months[d.month - 1]} ${d.day}, ${d.year}';
      } catch (_) {
        subtitle += ' · Last updated: $lastUpdated';
      }
    }

    final tocItems = features.map((f) => f.title).toList();

    return DocLayout(
      title: title,
      subtitle: subtitle,
      tocItems: tocItems,
      sections: features.map((f) => _LegalSection(feature: f)).toList(),
      bottomContent: const ContactCard(isSmall: true),
    );
  }
}

class _LegalSection extends StatelessWidget {
  final AppFeature feature;

  const _LegalSection({required this.feature});

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    
    return Container(
      margin: const EdgeInsets.only(bottom: 64),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(feature.title, style: NiType.h2(context)),
          const SizedBox(height: 24),
          ...feature.sections.map((sec) => Padding(
            padding: const EdgeInsets.only(bottom: 32),
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
                    h2: NiType.h2(context),
                    h2Padding: const EdgeInsets.only(top: 64, bottom: 24),
                    h3: NiType.h3(context),
                    h3Padding: const EdgeInsets.only(top: 32, bottom: 16),
                    horizontalRuleDecoration: BoxDecoration(
                      border: Border(top: BorderSide(color: tokens.border, width: 1)),
                    ),
                    blockquoteDecoration: BoxDecoration(
                      color: tokens.surface2,
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: tokens.calloutBorder, width: 1),
                    ),
                    blockquotePadding: const EdgeInsets.all(16),
                    blockquote: NiType.doc(context),
                  ),
                  onTapLink: (text, href, title) {
                    if (href != null) launchUrl(Uri.parse(href));
                  },
                ),
              ],
            ),
          )),
        ],
      ),
    );
  }
}
