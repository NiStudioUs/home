import 'package:flutter/material.dart';
import '../theme/ni_tokens.dart';

class NiButton extends StatefulWidget {
  final String text;
  final bool isPrimary;
  final VoidCallback onTap;
  final bool large;

  const NiButton({
    super.key,
    required this.text,
    this.isPrimary = false,
    required this.onTap,
    this.large = true,
  });

  @override
  State<NiButton> createState() => _NiButtonState();
}

class _NiButtonState extends State<NiButton> {
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
          padding: EdgeInsets.symmetric(
            horizontal: widget.large ? 28 : 20, 
            vertical: widget.large ? 16 : 12
          ),
          decoration: BoxDecoration(
            gradient: widget.isPrimary ? tokens.btnPrimary : null,
            color: widget.isPrimary ? null : tokens.surface,
            borderRadius: NiTokens.pill,
            border: widget.isPrimary ? null : Border.all(color: _isHovered ? tokens.accent : tokens.border, width: 1),
            boxShadow: widget.isPrimary ? tokens.btnPrimaryShadow : null,
          ),
          child: Text(
            widget.text, 
            style: NiType.button(context, large: widget.large).copyWith(
              color: widget.isPrimary ? tokens.accentInk : tokens.text,
            ),
          ),
        ),
      ),
    );
  }
}
