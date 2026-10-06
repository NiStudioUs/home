import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import '../design_tokens.dart';

class ContactCard extends StatelessWidget {
  final bool isSmall;
  final String title;
  final String text;

  const ContactCard({
    super.key,
    this.isSmall = false,
    this.title = 'Questions, feedback, or data requests?',
    this.text = 'Every policy on this site is written in plain language. If something is unclear, email us.',
  });

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    
    if (isSmall) {
      return Container(
        margin: const EdgeInsets.only(top: 56),
        padding: const EdgeInsets.all(26),
        decoration: BoxDecoration(
          color: tokens.surface,
          borderRadius: BorderRadius.circular(NiTokens.rCard),
          border: Border.all(color: tokens.border, width: 1),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(title, style: NiType.h3(context)),
            const SizedBox(height: 14),
            Text(text, style: NiType.muted(context)),
            const SizedBox(height: 24),
            _ContactButton(),
          ],
        ),
      );
    }
    
    return Container(
      padding: EdgeInsets.all(NiTokens.clampW(context, 34, 6, 70)),
      decoration: BoxDecoration(
        color: tokens.surface,
        borderRadius: BorderRadius.circular(NiTokens.rCard),
        border: Border.all(color: tokens.border, width: 1),
      ),
      child: Stack(
        alignment: Alignment.topCenter,
        children: [
          // Background radial glow
          Positioned(
            top: 0,
            child: Container(
              width: 600,
              height: 220,
              decoration: BoxDecoration(
                gradient: RadialGradient(
                  colors: [tokens.glow, Colors.transparent],
                  radius: 0.5,
                ),
              ),
            ),
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Text(title, style: NiType.h2(context), textAlign: TextAlign.center),
              const SizedBox(height: 14),
              ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 52 * 8.0), // rough max 52ch
                child: Text(text, style: NiType.muted(context), textAlign: TextAlign.center),
              ),
              const SizedBox(height: 24),
              _ContactButton(),
            ],
          ),
        ],
      ),
    );
  }
}

class _ContactButton extends StatefulWidget {
  @override
  State<_ContactButton> createState() => _ContactButtonState();
}

class _ContactButtonState extends State<_ContactButton> {
  bool _isHovered = false;

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    
    return MouseRegion(
      onEnter: (_) => setState(() => _isHovered = true),
      onExit: (_) => setState(() => _isHovered = false),
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        onTap: () => launchUrl(Uri.parse('mailto:ni.studio.us@outlook.com')),
        child: AnimatedContainer(
          duration: NiTokens.hoverFast,
          transform: Matrix4.translationValues(0, _isHovered ? -2 : 0, 0),
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
          decoration: BoxDecoration(
            gradient: tokens.btnPrimary,
            borderRadius: NiTokens.pill,
            boxShadow: tokens.btnPrimaryShadow,
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                'ni.studio.us@outlook.com', 
                style: NiType.button(context).copyWith(color: tokens.accentInk),
              ),
              const SizedBox(width: 8),
              Icon(Icons.arrow_forward, size: 17, color: tokens.accentInk),
            ],
          ),
        ),
      ),
    );
  }
}
