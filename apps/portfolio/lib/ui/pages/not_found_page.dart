import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../design_tokens.dart';

class NotFoundPage extends StatelessWidget {
  const NotFoundPage({super.key});

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    
    return Scaffold(
      backgroundColor: tokens.bg,
      body: Stack(
        children: [
          // Background Mesh
          Positioned(
            top: -100,
            left: 0,
            right: 0,
            child: Center(
              child: ImageFiltered(
                imageFilter: ImageFilter.blur(sigmaX: 140, sigmaY: 140),
                child: Container(
                  width: 500,
                  height: 500,
                  decoration: BoxDecoration(
                    color: tokens.accent.withOpacity(0.3),
                    shape: BoxShape.circle,
                  ),
                ),
              ),
            ),
          ),
          
          // Content
          Center(
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 600),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  ShaderMask(
                    shaderCallback: (bounds) => tokens.gradText.createShader(bounds),
                    blendMode: BlendMode.srcIn,
                    child: Text('404', style: NiType.notFoundTitle(context).copyWith(color: Colors.white)),
                  ),
                  const SizedBox(height: 16),
                  Text('Page not found', style: NiType.h3(context)),
                  const SizedBox(height: 16),
                  Text(
                    'The page you\'re looking for doesn\'t exist or has been moved.',
                    style: NiType.muted(context),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 32),
                  _HomeButton(),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _HomeButton extends StatefulWidget {
  @override
  State<_HomeButton> createState() => _HomeButtonState();
}

class _HomeButtonState extends State<_HomeButton> {
  bool _isHovered = false;

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    
    return MouseRegion(
      onEnter: (_) => setState(() => _isHovered = true),
      onExit: (_) => setState(() => _isHovered = false),
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        onTap: () => context.go('/'),
        child: AnimatedContainer(
          duration: NiTokens.hoverFast,
          transform: Matrix4.translationValues(0, _isHovered ? -2 : 0, 0),
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
          decoration: BoxDecoration(
            gradient: tokens.btnPrimary,
            borderRadius: NiTokens.pill,
            boxShadow: tokens.btnPrimaryShadow,
          ),
          child: Text(
            'Go to homepage', 
            style: NiType.button(context).copyWith(color: tokens.accentInk),
          ),
        ),
      ),
    );
  }
}
