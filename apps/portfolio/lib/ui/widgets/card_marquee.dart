import 'dart:ui';
import 'package:flutter/material.dart';
import '../design_tokens.dart';

class CardMarqueeScope extends InheritedWidget {
  final void Function(bool isHovered) onHoverChanged;

  const CardMarqueeScope({
    super.key,
    required this.onHoverChanged,
    required super.child,
  });

  static CardMarqueeScope? of(BuildContext context) {
    return context.dependOnInheritedWidgetOfExactType<CardMarqueeScope>();
  }

  @override
  bool updateShouldNotify(CardMarqueeScope oldWidget) => false;
}

class CardMarquee extends StatefulWidget {
  final List<Widget> cards;
  final Duration? period;

  const CardMarquee({
    super.key,
    required this.cards,
    this.period,
  });

  @override
  State<CardMarquee> createState() => CardMarqueeState();
}

class CardMarqueeState extends State<CardMarquee> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  final GlobalKey _measureKey = GlobalKey();
  double? _measuredTrackWidth;
  int _cardHoverCount = 0;
  bool _isOuterHovered = false;

  AnimationController get controller => _controller;

  double get _trackWidth => _measuredTrackWidth ?? (widget.cards.length * 340.0);

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: widget.period ?? NiTokens.marqueePeriod,
    )..repeat();
    _scheduleMeasure();
  }

  @override
  void didUpdateWidget(CardMarquee oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.cards.length != widget.cards.length) {
      _scheduleMeasure();
    }
  }

  void _scheduleMeasure() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted) return;
      final renderBox = _measureKey.currentContext?.findRenderObject() as RenderBox?;
      if (renderBox != null && renderBox.hasSize) {
        final w = renderBox.size.width;
        if (w > 0 && w != _measuredTrackWidth) {
          setState(() {
            _measuredTrackWidth = w;
          });
        }
      }
    });
  }

  void handleCardHover(bool isHovered) {
    if (isHovered) {
      _cardHoverCount++;
      if (_cardHoverCount == 1) {
        _controller.stop();
      }
    } else {
      _cardHoverCount = (_cardHoverCount - 1).clamp(0, 9999);
      if (_cardHoverCount == 0 && !_isOuterHovered) {
        if (!_controller.isAnimating) {
          _controller.repeat();
        }
      }
    }
  }

  void _onOuterEnter() {
    _isOuterHovered = true;
    _controller.stop();
  }

  void _onOuterExit() {
    _isOuterHovered = false;
    if (_cardHoverCount == 0) {
      if (!_controller.isAnimating) {
        _controller.repeat();
      }
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (widget.cards.isEmpty) {
      return const SizedBox.shrink();
    }

    final tokens = Theme.of(context).extension<NiTokens>() ??
        (Theme.of(context).brightness == Brightness.dark ? NiTokens.dark : NiTokens.light);

    if (widget.cards.length == 1) {
      return Container(
        decoration: BoxDecoration(
          color: tokens.bg.withValues(alpha: 0.6),
          border: Border.symmetric(horizontal: BorderSide(color: tokens.border, width: 1)),
        ),
        padding: const EdgeInsets.symmetric(vertical: 12),
        alignment: Alignment.center,
        child: widget.cards.first,
      );
    }

    return Container(
      decoration: BoxDecoration(
        color: tokens.bg.withValues(alpha: 0.6),
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
              onEnter: (_) => _onOuterEnter(),
              onExit: (_) => _onOuterExit(),
              child: SizedBox(
                height: 120,
                child: CardMarqueeScope(
                  onHoverChanged: handleCardHover,
                  child: AnimatedBuilder(
                    animation: _controller,
                    builder: (context, child) {
                      return LayoutBuilder(
                        builder: (context, constraints) {
                          return Stack(
                            children: [
                              Positioned(
                                left: -_controller.value * _trackWidth,
                                top: 0,
                                bottom: 0,
                                child: Row(
                                  children: [
                                    _MarqueeCardTrack(key: _measureKey, cards: widget.cards),
                                    _MarqueeCardTrack(cards: widget.cards),
                                    _MarqueeCardTrack(cards: widget.cards),
                                  ],
                                ),
                              ),
                            ],
                          );
                        },
                      );
                    },
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _MarqueeCardTrack extends StatelessWidget {
  final List<Widget> cards;

  const _MarqueeCardTrack({super.key, required this.cards});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: cards.map((card) {
        return Padding(
          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 12),
          child: card,
        );
      }).toList(),
    );
  }
}
