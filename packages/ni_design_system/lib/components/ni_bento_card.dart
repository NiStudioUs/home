import 'dart:ui';
import 'package:flutter/material.dart';
import '../theme/ni_tokens.dart';

class NiBentoCard extends StatefulWidget {
  final Widget child;
  final VoidCallback? onTap;
  final EdgeInsetsGeometry? padding;
  final bool fillBackground;

  const NiBentoCard({
    super.key,
    required this.child,
    this.onTap,
    this.padding,
    this.fillBackground = true,
  });

  @override
  State<NiBentoCard> createState() => _NiBentoCardState();
}

class _NiBentoCardState extends State<NiBentoCard> {
  bool _isHovered = false;

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    
    return MouseRegion(
      onEnter: (_) => setState(() => _isHovered = true),
      onExit: (_) => setState(() => _isHovered = false),
      cursor: widget.onTap != null ? SystemMouseCursors.click : SystemMouseCursors.basic,
      child: GestureDetector(
        onTap: widget.onTap,
        child: AnimatedContainer(
          duration: NiTokens.hoverFast,
          transform: Matrix4.translationValues(0, _isHovered ? -4 : 0, 0),
          decoration: BoxDecoration(
            color: widget.fillBackground ? tokens.surface.withOpacity(0.85) : null,
            borderRadius: BorderRadius.circular(NiTokens.rSpot),
            border: Border.all(color: _isHovered ? tokens.accent : tokens.border, width: 1),
            boxShadow: _isHovered ? tokens.cardHoverShadow : tokens.shadow,
          ),
          child: ClipRRect(
            borderRadius: BorderRadius.circular(NiTokens.rSpot),
            child: widget.fillBackground ? BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 8, sigmaY: 8),
              child: Padding(
                padding: widget.padding ?? const EdgeInsets.all(24),
                child: widget.child,
              ),
            ) : Padding(
              padding: widget.padding ?? const EdgeInsets.all(24),
              child: widget.child,
            ),
          ),
        ),
      ),
    );
  }
}
