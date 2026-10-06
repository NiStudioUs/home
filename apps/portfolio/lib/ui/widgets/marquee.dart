import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../models/data_model.dart';
import '../design_tokens.dart';

class HomeMarquee extends StatefulWidget {
  const HomeMarquee({super.key});

  @override
  State<HomeMarquee> createState() => _HomeMarqueeState();
}

class _HomeMarqueeState extends State<HomeMarquee> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  bool _isHovered = false;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: NiTokens.marqueePeriod,
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
    final dataModel = Provider.of<DataModel>(context);
    
    // Flatten all feature titles
    final featureTitles = dataModel.apps.expand((app) => app.features.map((f) => f.title)).toList();
    
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
                height: 56, // Approx based on font size + padding
                child: AnimatedBuilder(
                  animation: _controller,
                  builder: (context, child) {
                    return LayoutBuilder(
                      builder: (context, constraints) {
                        return Stack(
                          children: [
                            Positioned(
                              left: -_controller.value * 2000, // Very rough wide width, need a better scrolling solution if exact width matters
                              top: 0,
                              bottom: 0,
                              child: Row(
                                children: [
                                  _MarqueeTrack(titles: featureTitles),
                                  _MarqueeTrack(titles: featureTitles),
                                  _MarqueeTrack(titles: featureTitles),
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
  final List<String> titles;
  const _MarqueeTrack({required this.titles});

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    
    return Row(
      children: titles.map((title) {
        return Padding(
          padding: const EdgeInsets.symmetric(horizontal: 28, vertical: 16),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(title, style: NiType.marquee(context)),
              const SizedBox(width: 56),
              Text('✦', style: NiType.marquee(context).copyWith(color: tokens.accent)),
            ],
          ),
        );
      }).toList(),
    );
  }
}
