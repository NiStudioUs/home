import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import 'package:url_launcher/url_launcher.dart';
import '../design_tokens.dart';
import '../../models/data_model.dart';

class NiFooter extends StatelessWidget {
  const NiFooter({super.key});

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    final isMobile = NiTokens.isMobile(context);
    final dataModel = Provider.of<DataModel>(context, listen: false);

    return Container(
      width: double.infinity,
      margin: const EdgeInsets.only(top: 40),
      padding: const EdgeInsets.fromLTRB(0, 52, 0, 24),
      decoration: BoxDecoration(
        color: tokens.bgAlt,
        border: Border(top: BorderSide(color: tokens.border, width: 1)),
      ),
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: NiTokens.maxWidth),
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: NiTokens.gutter),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Top Grid
                if (isMobile)
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      _BrandColumn(),
                      const SizedBox(height: 32),
                      Wrap(
                        spacing: 32,
                        runSpacing: 32,
                        children: dataModel.apps.map((app) => SizedBox(width: 150, child: _AppColumn(app: app))).toList(),
                      ),
                    ],
                  )
                else
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Expanded(flex: 14, child: _BrandColumn()),
                      const SizedBox(width: 32),
                      ...dataModel.apps.map((app) {
                        return Expanded(
                          flex: 10,
                          child: Padding(
                            padding: const EdgeInsets.only(left: 32),
                            child: _AppColumn(app: app),
                          ),
                        );
                      }),
                    ],
                  ),
                
                // Base Row
                Container(
                  margin: const EdgeInsets.only(top: 40),
                  padding: const EdgeInsets.only(top: 20),
                  decoration: BoxDecoration(
                    border: Border(top: BorderSide(color: tokens.border, width: 1)),
                  ),
                  child: isMobile 
                      ? Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            _LeftBaseLinks(),
                            const SizedBox(height: 8),
                            _RightBaseLink(),
                          ],
                        )
                      : Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            _LeftBaseLinks(),
                            _RightBaseLink(),
                          ],
                        ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _BrandColumn extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            ClipRRect(
              borderRadius: BorderRadius.circular(NiTokens.rBrandImg),
              child: Image.asset(
                'assets/developers/dev-avatar.png',
                width: 30,
                height: 30,
                errorBuilder: (c, e, s) => Container(
                  width: 30,
                  height: 30,
                  color: tokens.accent,
                  child: const Center(child: Text('N', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold))),
                ),
              ),
            ),
            const SizedBox(width: 12),
            Text('Ni Studio Us', style: NiType.brand(context).copyWith(color: tokens.text)),
          ],
        ),
        const SizedBox(height: 16),
        Text(
          'Small, private, well-made apps. Built in Flutter.',
          style: NiType.nav(context).copyWith(fontSize: 14.4), // ~0.9rem
        ),
      ],
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
        Text(app.shortName, style: NiType.footerHead(context).copyWith(color: tokens.text)),
        const SizedBox(height: 12),
        _FooterLink(text: 'Overview', onTap: () => context.go('/apps/${app.id}/')),
        _FooterLink(text: 'How to use', onTap: () => context.go('/apps/${app.id}/how-to/')),
        _FooterLink(text: 'Privacy Policy', onTap: () => context.go('/apps/${app.id}/privacy')),
        _FooterLink(text: 'Terms & Conditions', onTap: () => context.go('/apps/${app.id}/terms')),
      ],
    );
  }
}

class _FooterLink extends StatefulWidget {
  final String text;
  final VoidCallback onTap;
  const _FooterLink({required this.text, required this.onTap});

  @override
  State<_FooterLink> createState() => _FooterLinkState();
}

class _FooterLinkState extends State<_FooterLink> {
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
          padding: const EdgeInsets.symmetric(vertical: 3),
          child: Text(
            widget.text,
            style: NiType.nav(context).copyWith(
              fontSize: 14.4,
              color: _isHovered ? tokens.text : tokens.muted,
            ),
          ),
        ),
      ),
    );
  }
}

class _LeftBaseLinks extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    final year = DateTime.now().year;
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Text('© $year Ni Studio Us · ', style: NiType.stat(context).copyWith(fontSize: 13.6)),
        MouseRegion(
          cursor: SystemMouseCursors.click,
          child: GestureDetector(
            onTap: () => context.go('/sitemap/'),
            child: Text(
              'Sitemap',
              style: NiType.stat(context).copyWith(
                fontSize: 13.6,
                decoration: TextDecoration.underline,
                decorationColor: tokens.muted,
              ),
            ),
          ),
        ),
      ],
    );
  }
}

class _RightBaseLink extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    return MouseRegion(
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        onTap: () => launchUrl(Uri.parse('mailto:ni.studio.us@outlook.com')),
        child: Text(
          'ni.studio.us@outlook.com',
          style: NiType.stat(context).copyWith(
            fontSize: 13.6,
            decoration: TextDecoration.underline,
            decorationColor: tokens.muted,
          ),
        ),
      ),
    );
  }
}
