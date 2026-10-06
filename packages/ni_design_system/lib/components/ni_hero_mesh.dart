import 'dart:ui';
import 'package:flutter/material.dart';
import '../theme/ni_tokens.dart';

class NiHeroMesh extends StatefulWidget {
  const NiHeroMesh({super.key});

  @override
  State<NiHeroMesh> createState() => _NiHeroMeshState();
}

class _NiHeroMeshState extends State<NiHeroMesh> with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: NiTokens.driftPeriod,
    )..repeat(reverse: true);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        // Drift translate(60,40) scale(1.12)
        final val = _controller.value;
        final dx = val * 60;
        final dy = val * 40;
        final s = 1.0 + (val * 0.12);
        
        return Stack(
          children: [
            Positioned(
              left: -140 + dx,
              top: -180 + dy,
              child: Transform.scale(
                scale: s,
                child: _Blob(color: tokens.accent2, size: 560, opacity: tokens.meshOpacity[0]),
              ),
            ),
            Positioned(
              right: MediaQuery.sizeOf(context).width * 0.08 - dx,
              top: -120 - dy,
              child: Transform.scale(
                scale: 1.12 - (val * 0.12),
                child: _Blob(color: NiTokens.meshPink, size: 480, opacity: tokens.meshOpacity[1]),
              ),
            ),
            Positioned(
              right: -120 + dx,
              bottom: 80 - dy,
              child: Transform.scale(
                scale: s,
                child: _Blob(color: NiTokens.meshBlue, size: 420, opacity: tokens.meshOpacity[2]),
              ),
            ),
          ],
        );
      },
    );
  }
}

class _Blob extends StatelessWidget {
  final Color color;
  final double size;
  final double opacity;

  const _Blob({required this.color, required this.size, required this.opacity});

  @override
  Widget build(BuildContext context) {
    return ImageFiltered(
      imageFilter: ImageFilter.blur(sigmaX: 90, sigmaY: 90),
      child: Container(
        width: size,
        height: size,
        decoration: BoxDecoration(
          color: color.withOpacity(opacity),
          shape: BoxShape.circle,
        ),
      ),
    );
  }
}
