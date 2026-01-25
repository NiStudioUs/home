import 'package:flutter/material.dart';

Widget buildImage(
  String url, {
  double? width,
  double? height,
  BoxFit? fit,
  Alignment alignment = Alignment.center,
}) {
  if (url.isEmpty) {
    return SizedBox(
      width: width,
      height: height,
      child: const Icon(Icons.broken_image),
    );
  }

  if (url.startsWith('http') || url.startsWith('https')) {
    return Image.network(
      url,
      width: width,
      height: height,
      fit: fit,
      alignment: alignment,
      errorBuilder: (context, error, stackTrace) => SizedBox(
        width: width,
        height: height,
        child: const Icon(Icons.broken_image),
      ),
    );
  } else {
    // Assume local asset
    return Image.asset(
      url,
      width: width,
      height: height,
      fit: fit,
      alignment: alignment,
      errorBuilder: (context, error, stackTrace) => SizedBox(
        width: width,
        height: height,
        child: const Icon(Icons.broken_image),
      ),
    );
  }
}

ImageProvider getImageProvider(String url) {
  if (url.isEmpty) {
    return const AssetImage(
      'assets/images/placeholder.png',
    ); // You might need a placeholder or handle this
  }
  if (url.startsWith('http') || url.startsWith('https')) {
    return NetworkImage(url);
  } else {
    return AssetImage(url);
  }
}
