import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:go_router/go_router.dart';
import '../../models/data_model.dart';
import '../design_tokens.dart';

class HomeFeatures extends StatelessWidget {
  const HomeFeatures({super.key});

  @override
  Widget build(BuildContext context) {
    final dataModel = Provider.of<DataModel>(context);
    
    return Center(
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: NiTokens.maxWidth),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: NiTokens.gutter),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Section Head
              _SectionHead(
                eyebrow: 'Features',
                title: 'Everything each app can do',
                subtitle: 'Jump straight to a feature. Every link opens the detailed write-up.',
              ),
              const SizedBox(height: 44),
              // Feature Rows
              ...dataModel.apps.map((app) => Padding(
                padding: const EdgeInsets.only(bottom: 24),
                child: NiApp(
                  appId: app.id,
                  child: _FeatureRow(app: app),
                ),
              )),
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
  final String? subtitle;

  const _SectionHead({required this.eyebrow, required this.title, this.subtitle});

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
          if (subtitle != null) ...[
            const SizedBox(height: 14),
            Text(subtitle!, style: NiType.muted(context)),
          ],
        ],
      ),
    );
  }
}

class _FeatureRow extends StatelessWidget {
  final AppModel app;

  const _FeatureRow({required this.app});

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    final isMobile = NiTokens.isMobile(context);
    
    final rightSide = Wrap(
      spacing: 8,
      runSpacing: 8,
      children: app.features.map((f) => _FeatureChip(
        title: f.title, 
        onTap: () => context.go('/apps/${app.id}/#${_slugify(f.title)}'),
      )).toList(),
    );

    final leftSide = Row(
      children: [
        ClipRRect(
          borderRadius: BorderRadius.circular(NiTokens.iconRadius(44, small: true)),
          child: Image.asset(
            app.iconUrl,
            width: 44,
            height: 44,
          ),
        ),
        const SizedBox(width: 14),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(app.shortName, style: NiType.body(context).copyWith(fontWeight: FontWeight.w700), overflow: TextOverflow.ellipsis),
              Text('${app.features.length} features', style: NiType.muted(context, 13.3)),
            ],
          ),
        ),
      ],
    );

    final content = isMobile 
        ? [leftSide, const SizedBox(height: 16), rightSide]
        : [SizedBox(width: 250, child: leftSide), Expanded(child: rightSide)];

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 20),
      decoration: BoxDecoration(
        color: tokens.surface,
        borderRadius: BorderRadius.circular(NiTokens.r),
        border: Border.all(color: tokens.border, width: 1),
      ),
      child: isMobile
          ? Column(crossAxisAlignment: CrossAxisAlignment.start, children: content)
          : Row(crossAxisAlignment: CrossAxisAlignment.start, children: content),
    );
  }

  String _slugify(String text) {
    return text.toLowerCase().replaceAll(RegExp(r'[^a-z0-9]+'), '-').replaceAll(RegExp(r'^-+|-+$'), '');
  }
}

class _FeatureChip extends StatefulWidget {
  final String title;
  final VoidCallback onTap;

  const _FeatureChip({required this.title, required this.onTap});

  @override
  State<_FeatureChip> createState() => _FeatureChipState();
}

class _FeatureChipState extends State<_FeatureChip> {
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
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 7),
          decoration: BoxDecoration(
            color: _isHovered ? tokens.accent : tokens.surface2,
            borderRadius: NiTokens.pill,
            border: Border.all(color: _isHovered ? tokens.accent : tokens.border, width: 1),
          ),
          child: Text(
            widget.title,
            style: NiType.chip(context).copyWith(
              color: _isHovered ? tokens.accentInk : tokens.text,
            ),
          ),
        ),
      ),
    );
  }
}
