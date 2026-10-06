import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:go_router/go_router.dart';
import 'package:url_launcher/url_launcher.dart';
import '../../models/data_model.dart';
import '../design_tokens.dart';

class HomeApps extends StatelessWidget {
  const HomeApps({super.key});

  @override
  Widget build(BuildContext context) {
    final dataModel = Provider.of<DataModel>(context);
    
    // Sort apps: featured app first, then the rest
    final apps = List<AppModel>.from(dataModel.apps);
    apps.sort((a, b) {
      if (a.id == 'scribble-notes') return -1;
      if (b.id == 'scribble-notes') return 1;
      return 0;
    });

    return Center(
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: NiTokens.maxWidth),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: NiTokens.gutter),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _SectionHead(
                eyebrow: 'Apps',
                title: 'Built to be used daily',
              ),
              const SizedBox(height: 44),
              ...apps.asMap().entries.map((entry) {
                final index = entry.key;
                final app = entry.value;
                return Padding(
                  padding: const EdgeInsets.only(bottom: 32),
                  child: NiApp(
                    appId: app.id,
                    child: _AppCard(app: app, isFlipped: index % 2 != 0),
                  ),
                );
              }),
            ],
          ),
        ),
      ),
    );
  }
}

class _SectionHead extends StatelessWidget {
  final String eyebrow;
  final String title;

  const _SectionHead({required this.eyebrow, required this.title});

  @override
  Widget build(BuildContext context) {
    return ConstrainedBox(
      constraints: const BoxConstraints(maxWidth: 720),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(eyebrow.toUpperCase(), style: NiType.eyebrow(context)),
          const SizedBox(height: 14),
          Text(title, style: NiType.h2(context)),
        ],
      ),
    );
  }
}

class _AppCard extends StatefulWidget {
  final AppModel app;
  final bool isFlipped;

  const _AppCard({required this.app, required this.isFlipped});

  @override
  State<_AppCard> createState() => _AppCardState();
}

class _AppCardState extends State<_AppCard> {
  bool _isHovered = false;

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    final isMobile = NiTokens.isMobile(context);
    
    final copyCol = _AppCopyColumn(app: widget.app);
    final shotsCol = widget.app.screenshots.isEmpty 
        ? _AppIconStage(app: widget.app) 
        : _AppShotsColumn(app: widget.app);

    final List<Widget> columns = isMobile 
        ? [copyCol, const SizedBox(height: 32), shotsCol]
        : (widget.isFlipped 
            ? [Expanded(child: shotsCol), const SizedBox(width: 32), Expanded(child: copyCol)]
            : [Expanded(child: copyCol), const SizedBox(width: 32), Expanded(child: shotsCol)]);

    return MouseRegion(
      onEnter: (_) => setState(() => _isHovered = true),
      onExit: (_) => setState(() => _isHovered = false),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 250),
        padding: EdgeInsets.all(NiTokens.clampW(context, 22, 3, 40)),
        decoration: BoxDecoration(
          color: tokens.surface,
          borderRadius: BorderRadius.circular(NiTokens.rCard),
          border: Border.all(color: _isHovered ? tokens.cardHoverBorder : tokens.border, width: 1),
          boxShadow: _isHovered ? tokens.cardHoverShadow : null,
        ),
        clipBehavior: Clip.antiAlias,
        child: isMobile 
            ? Column(children: columns)
            : Row(crossAxisAlignment: CrossAxisAlignment.center, children: columns),
      ),
    );
  }
}

class _AppCopyColumn extends StatelessWidget {
  final AppModel app;

  const _AppCopyColumn({required this.app});

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    final isFeatured = app.id == 'scribble-notes';
    
    // Truncate fullDescription to 227 characters at word boundary
    String desc = app.fullDescription;
    if (desc.length > 227) {
      final boundary = desc.lastIndexOf(' ', 227);
      desc = '${desc.substring(0, boundary > 0 ? boundary : 227)}…';
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Title row
        Row(
          children: [
            ClipRRect(
              borderRadius: BorderRadius.circular(NiTokens.iconRadius(56, small: false)),
              child: Image.asset(app.iconUrl, width: 56, height: 56),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Wrap(
                spacing: 6,
                runSpacing: 6,
                crossAxisAlignment: WrapCrossAlignment.center,
                children: [
                  Text(app.shortName, style: NiType.h3(context)),
                  if (isFeatured)
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                      decoration: BoxDecoration(
                        color: tokens.accent.withOpacity(0.18),
                        borderRadius: NiTokens.pill,
                      ),
                      child: Text('FEATURED', style: NiType.badge(context, tokens.accent)),
                    ),
                  if (app.status.isNotEmpty)
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                      decoration: BoxDecoration(
                        color: tokens.badgeBg,
                        borderRadius: NiTokens.pill,
                      ),
                      child: Text(app.status, style: NiType.badge(context, tokens.badgeFg)),
                    ),
                ],
              ),
            ),
          ],
        ),
        const SizedBox(height: 14),
        Text(app.shortDescription, style: NiType.appSub(context)),
        const SizedBox(height: 14),
        Text(desc, style: NiType.muted(context)),
        const SizedBox(height: 14),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: app.tags.map((t) => Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
            decoration: BoxDecoration(
              color: tokens.surface2,
              borderRadius: NiTokens.pill,
              border: Border.all(color: tokens.border, width: 1),
            ),
            child: Text(t, style: NiType.tag(context)),
          )).toList(),
        ),
        const SizedBox(height: 26),
        // CTA Row
        Wrap(
          spacing: 10,
          runSpacing: 10,
          children: [
            _Button(text: 'View app →', isPrimary: true, onTap: () => context.go('/apps/${app.id}/')),
            if (app.demoUrl.isNotEmpty)
              _Button(text: 'Live Demo', onTap: () async {
                final uri = Uri.parse(app.demoUrl);
                if (await canLaunchUrl(uri)) {
                  await launchUrl(uri);
                }
              }),
            _Button(text: 'Privacy', onTap: () => context.go('/apps/${app.id}/privacy')),
            _Button(text: 'Terms', onTap: () => context.go('/apps/${app.id}/terms')),
          ],
        ),
      ],
    );
  }
}

class _Button extends StatefulWidget {
  final String text;
  final bool isPrimary;
  final VoidCallback onTap;

  const _Button({required this.text, this.isPrimary = false, required this.onTap});

  @override
  State<_Button> createState() => _ButtonState();
}

class _ButtonState extends State<_Button> {
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
          transform: Matrix4.translationValues(0, _isHovered ? -2 : 0, 0),
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
          decoration: BoxDecoration(
            gradient: widget.isPrimary ? tokens.btnPrimary : null,
            color: widget.isPrimary ? null : tokens.surface,
            borderRadius: NiTokens.pill,
            border: widget.isPrimary ? null : Border.all(color: _isHovered ? tokens.accent : tokens.border, width: 1),
            boxShadow: widget.isPrimary ? tokens.btnPrimaryShadow : null,
          ),
          child: Text(
            widget.text, 
            style: NiType.button(context).copyWith(
              color: widget.isPrimary ? tokens.accentInk : tokens.text,
            ),
          ),
        ),
      ),
    );
  }
}

class _AppShotsColumn extends StatelessWidget {
  final AppModel app;

  const _AppShotsColumn({required this.app});

  @override
  Widget build(BuildContext context) {
    final isMobile = NiTokens.isMobile(context);
    final shots = app.screenshots.take(3).toList();
    
    return Container(
      constraints: BoxConstraints(maxHeight: isMobile ? 380 : 440),
      child: ShaderMask(
        shaderCallback: (Rect bounds) {
          return const LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [Colors.black, Colors.black, Colors.transparent],
            stops: [0.0, 0.8, 1.0],
          ).createShader(bounds);
        },
        blendMode: BlendMode.dstIn,
        child: Padding(
          padding: const EdgeInsets.fromLTRB(6, 4, 6, 0),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              if (shots.isNotEmpty) Expanded(child: _AppShot(url: shots[0].url, marginTop: 0)),
              if (shots.length > 1) ...[
                const SizedBox(width: 14),
                Expanded(child: _AppShot(url: shots[1].url, marginTop: 34)),
              ],
              if (shots.length > 2) ...[
                const SizedBox(width: 14),
                Expanded(child: _AppShot(url: shots[2].url, marginTop: 10)),
              ],
            ],
          ),
        ),
      ),
    );
  }
}

class _AppShot extends StatelessWidget {
  final String url;
  final double marginTop;

  const _AppShot({required this.url, required this.marginTop});

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    
    return Container(
      margin: EdgeInsets.only(top: marginTop),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(NiTokens.rShot),
        border: Border.all(color: tokens.surface2, width: 5),
        boxShadow: tokens.shadow,
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(NiTokens.rShot - 5), // Adjusting inner radius
        child: AspectRatio(
          aspectRatio: 9 / 19,
          child: Image.asset(
            url.isNotEmpty ? url : 'assets/placeholders/screenshot.png',
            fit: BoxFit.cover,
            alignment: Alignment.topCenter,
          ),
        ),
      ),
    );
  }
}

class _AppIconStage extends StatelessWidget {
  final AppModel app;

  const _AppIconStage({required this.app});

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    
    return Container(
      height: 340,
      decoration: BoxDecoration(
        color: tokens.surface2,
        borderRadius: BorderRadius.circular(NiTokens.rStage),
        border: Border.all(color: tokens.border, width: 1),
      ),
      child: Stack(
        fit: StackFit.expand,
        children: [
          Container(
            decoration: BoxDecoration(
              gradient: RadialGradient(
                colors: [tokens.glow, Colors.transparent],
                stops: const [0.0, 0.85],
              ),
            ),
          ),
          Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                width: 132,
                height: 132,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(NiTokens.rStageIcon),
                  boxShadow: [
                    BoxShadow(color: tokens.accent2, offset: const Offset(0, 24), blurRadius: 60, spreadRadius: -18),
                    BoxShadow(color: tokens.accent.withOpacity(0.12), spreadRadius: 8),
                  ],
                ),
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(NiTokens.rStageIcon),
                  child: Image.asset(app.iconUrl),
                ),
              ),
              const SizedBox(height: 18),
              Text('Screenshots coming soon', style: NiType.muted(context, 14.4)),
            ],
          ),
        ],
      ),
    );
  }
}
