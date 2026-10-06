import 'dart:ui';
import 'package:flutter/material.dart';
import '../theme/ni_tokens.dart';

class NiMarquee extends StatefulWidget {
  final List<String> items;
  final Duration? period;

  const NiMarquee({
    super.key,
    required this.items,
    this.period,
  });

  @override
  State<NiMarquee> createState() => _NiMarqueeState();
}

class _NiMarqueeState extends State<NiMarquee> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  bool _isHovered = false;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: widget.period ?? NiTokens.marqueePeriod,
    )..repeat();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    
    return Container(
      margin: const EdgeInsets.only(top: 36),
      decoration: BoxDecoration(
        color: tokens.bg.withOpacity(0.6),
        border: Border.symmetric(horizontal: BorderSide(color: tokens.border, width: 1)),
      ),
      child: ClipRect(
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 6, sigmaY: 6),
          child: ShaderMask(
            shaderCallback: (Rect bounds) {
              return const LinearGradient(
                colors: [Colors.transparent, Colors.black, Colors.black, Colors.transparent],
                stops: [0.0, 0.08, 0.92, 1.0],
                begin: Alignment.centerLeft,
                end: Alignment.centerRight,
              ).createShader(bounds);
            },
            blendMode: BlendMode.dstIn,
            child: MouseRegion(
              onEnter: (_) {
                setState(() => _isHovered = true);
                _controller.stop();
              },
              onExit: (_) {
                setState(() => _isHovered = false);
                _controller.repeat();
              },
              child: SizedBox(
                height: 56,
                child: AnimatedBuilder(
                  animation: _controller,
                  builder: (context, child) {
                    return LayoutBuilder(
                      builder: (context, constraints) {
                        return Stack(
                          children: [
                            Positioned(
                              left: -_controller.value * 2000,
                              top: 0,
                              bottom: 0,
                              child: Row(
                                children: [
                                  _MarqueeTrack(items: widget.items),
                                  _MarqueeTrack(items: widget.items),
                                  _MarqueeTrack(items: widget.items),
                                ],
                              ),
                            ),
                          ],
                        );
                      }
                    );
                  },
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _MarqueeTrack extends StatelessWidget {
  final List<String> items;
  const _MarqueeTrack({required this.items});

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    
    return Row(
      children: items.map((item) {
        return Padding(
          padding: const EdgeInsets.symmetric(horizontal: 28, vertical: 16),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(item, style: NiType.marquee(context)),
              const SizedBox(width: 56),
              Text('✦', style: NiType.marquee(context).copyWith(color: tokens.accent)),
            ],
          ),
        );
      }).toList(),
    );
  }
}
