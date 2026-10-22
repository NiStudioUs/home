import 'package:flutter/material.dart';

class NiImageSkeleton extends StatefulWidget {
  final double? width;
  final double? height;
  final BorderRadius? borderRadius;

  const NiImageSkeleton({super.key, this.width, this.height, this.borderRadius});

  @override
  State<NiImageSkeleton> createState() => _NiImageSkeletonState();
}

class _NiImageSkeletonState extends State<NiImageSkeleton> with SingleTickerProviderStateMixin {
  late final AnimationController _controller;
  late final Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1400),
    )..repeat();
    _animation = Tween<double>(begin: -1.0, end: 2.0).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOutSine),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final baseColor = isDark ? const Color(0xFF1B1B24) : const Color(0xFFE9EAF0);
    final highlightColor = isDark ? const Color(0xFF2B2B38) : const Color(0xFFF7F7FA);

    return AnimatedBuilder(
      animation: _animation,
      builder: (context, child) {
        return Container(
          width: widget.width,
          height: widget.height,
          decoration: BoxDecoration(
            borderRadius: widget.borderRadius,
            gradient: LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [baseColor, highlightColor, baseColor],
              stops: [
                (_animation.value - 0.3).clamp(0.0, 1.0),
                _animation.value.clamp(0.0, 1.0),
                (_animation.value + 0.3).clamp(0.0, 1.0),
              ],
            ),
          ),
        );
      },
    );
  }
}

Widget buildImage(
  String url, {
  double? width,
  double? height,
  BoxFit? fit,
  Alignment alignment = Alignment.center,
  BorderRadius? borderRadius,
}) {
  if (url.isEmpty) {
    return SizedBox(
      width: width,
      height: height,
      child: const Icon(Icons.broken_image),
    );
  }

  final bool isNetwork = url.startsWith('http') || url.startsWith('https');
  final Widget imageWidget = isNetwork
      ? Image.network(
          url,
          width: width,
          height: height,
          fit: fit,
          alignment: alignment,
          frameBuilder: (context, child, frame, wasSynchronouslyLoaded) {
            if (wasSynchronouslyLoaded || frame != null) return child;
            return NiImageSkeleton(width: width, height: height, borderRadius: borderRadius);
          },
          errorBuilder: (context, error, stackTrace) => SizedBox(
            width: width,
            height: height,
            child: const Icon(Icons.broken_image, color: Colors.grey),
          ),
        )
      : Image.asset(
          url,
          width: width,
          height: height,
          fit: fit,
          alignment: alignment,
          frameBuilder: (context, child, frame, wasSynchronouslyLoaded) {
            if (wasSynchronouslyLoaded || frame != null) return child;
            return NiImageSkeleton(width: width, height: height, borderRadius: borderRadius);
          },
          errorBuilder: (context, error, stackTrace) => SizedBox(
            width: width,
            height: height,
            child: const Icon(Icons.broken_image, color: Colors.grey),
          ),
        );

  return borderRadius != null
      ? ClipRRect(borderRadius: borderRadius, child: imageWidget)
      : imageWidget;
}

ImageProvider getImageProvider(String url) {
  if (url.isEmpty) {
    return const AssetImage(
      'assets/images/placeholder.webp',
    ); // You might need a placeholder or handle this
  }
  if (url.startsWith('http') || url.startsWith('https')) {
    return NetworkImage(url);
  } else {
    return AssetImage(url);
  }
}
