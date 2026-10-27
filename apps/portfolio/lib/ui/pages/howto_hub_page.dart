import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:go_router/go_router.dart';
import '../../models/howto_model.dart';
import '../design_tokens.dart';
import '../widgets/footer.dart';

/// Global index of every app's published how-to guide. Each row just routes
/// into the existing per-app /apps/:id/how-to page rather than rendering
/// content itself.
class HowtoHubPage extends StatelessWidget {
  const HowtoHubPage({super.key});

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    final howtoIndex = Provider.of<HowtoIndexModel>(context);
    final apps = [...howtoIndex.apps]
      ..sort((a, b) => a.title.toLowerCase().compareTo(b.title.toLowerCase()));

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
                      Text('How-to Guides', style: NiType.h1(context)),
                      const SizedBox(height: 16),
                      Text(
                        'Step-by-step guides for getting the most out of each app.',
                        style: NiType.lead(context),
                      ),
                      const SizedBox(height: 60),
                      if (apps.isEmpty)
                        Text(
                          'No how-to guides published yet.',
                          style: NiType.muted(context),
                        )
                      else
                        ...apps.map((app) => Padding(
                          padding: const EdgeInsets.only(bottom: 12),
                          child: _HowtoAppRow(app: app),
                        )),
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

class _HowtoAppRow extends StatefulWidget {
  final HowtoAppModel app;
  const _HowtoAppRow({required this.app});

  @override
  State<_HowtoAppRow> createState() => _HowtoAppRowState();
}

class _HowtoAppRowState extends State<_HowtoAppRow> {
  bool _isHovered = false;

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    return MouseRegion(
      onEnter: (_) => setState(() => _isHovered = true),
      onExit: (_) => setState(() => _isHovered = false),
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        onTap: () => context.go('/apps/${widget.app.id}/how-to/'),
        child: AnimatedContainer(
          duration: NiTokens.hoverFast,
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 18),
          decoration: BoxDecoration(
            color: _isHovered ? tokens.surface2 : tokens.surface,
            borderRadius: BorderRadius.circular(14),
            border: Border.all(color: tokens.border),
          ),
          child: Row(
            children: [
              Expanded(
                child: Text(widget.app.title, style: NiType.h3(context)),
              ),
              Icon(
                Icons.arrow_forward,
                size: 18,
                color: _isHovered ? tokens.accent : tokens.muted,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
