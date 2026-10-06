import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:go_router/go_router.dart';
import '../../models/data_model.dart';
import '../design_tokens.dart';
import '../widgets/topbar.dart';
import '../widgets/footer.dart';

class SitemapPage extends StatelessWidget {
  const SitemapPage({super.key});

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    final isMobile = NiTokens.isMobile(context);
    final dataModel = Provider.of<DataModel>(context);

    return Scaffold(
      backgroundColor: tokens.bg,
      body: SingleChildScrollView(
        padding: const EdgeInsets.only(top: NiTokens.topbarHeight),
        child: Column(
          children: [
            Center(
              child: ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: NiTokens.maxWidth),
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(NiTokens.gutter, 60, NiTokens.gutter, 100),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Sitemap', style: NiType.h1(context)),
                      const SizedBox(height: 60),
                      if (isMobile)
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: dataModel.apps.map((app) => Padding(
                            padding: const EdgeInsets.only(bottom: 40),
                            child: _AppColumn(app: app),
                          )).toList(),
                        )
                      else
                        Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: dataModel.apps.map((app) => Expanded(
                            child: _AppColumn(app: app),
                          )).toList(),
                        ),
                    ],
                  ),
                ),
              ),
            ),
            const NiFooter(),
          ],
        ),
      ),
    );
  }
}

class _AppColumn extends StatelessWidget {
  final AppModel app;
  const _AppColumn({required this.app});

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(app.shortName, style: NiType.h2(context)),
        const SizedBox(height: 16),
        _SitemapLink(text: 'Overview', onTap: () => context.go('/apps/${app.id}/')),
        _SitemapLink(text: 'How to use', onTap: () => context.go('/apps/${app.id}/how-to/')),
        _SitemapLink(text: 'Privacy Policy', onTap: () => context.go('/apps/${app.id}/privacy')),
        _SitemapLink(text: 'Terms & Conditions', onTap: () => context.go('/apps/${app.id}/terms')),
      ],
    );
  }
}

class _SitemapLink extends StatefulWidget {
  final String text;
  final VoidCallback onTap;
  const _SitemapLink({required this.text, required this.onTap});

  @override
  State<_SitemapLink> createState() => _SitemapLinkState();
}

class _SitemapLinkState extends State<_SitemapLink> {
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
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 6),
          child: Text(
            widget.text,
            style: NiType.nav(context).copyWith(
              fontSize: 16,
              color: _isHovered ? tokens.text : tokens.muted,
            ),
          ),
        ),
      ),
    );
  }
}
