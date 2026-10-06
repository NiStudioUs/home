import 'package:flutter/material.dart';

class StickyContainer extends StatelessWidget {
  final double scrollY;
  final double headerHeight;
  final Widget child;

  const StickyContainer({
    super.key,
    required this.scrollY,
    required this.headerHeight,
    required this.child,
  });

  @override
  Widget build(BuildContext context) {
    double offset = 0;
    if (scrollY > headerHeight) {
      offset = scrollY - headerHeight + 100;
    }
    
    return Transform.translate(
      offset: Offset(0, offset),
      child: child,
    );
  }
}
