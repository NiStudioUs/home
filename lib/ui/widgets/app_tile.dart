import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../models/data_model.dart';
import 'image_helper.dart';

class AppTile extends StatelessWidget {
  final AppModel app;

  const AppTile({super.key, required this.app});

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 2,
      clipBehavior: Clip.antiAlias,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: InkWell(
        onTap: () => context.go('/app/${app.id}'),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // App Icon / Image Placeholder
            Expanded(
              child: Container(
                color: Theme.of(context).colorScheme.surfaceContainerHighest,
                child: app.iconUrl.isNotEmpty
                    ? Image(
                        image: getImageProvider(app.iconUrl),
                        fit: BoxFit.cover,
                        color: Theme.of(
                          context,
                        ).colorScheme.surfaceContainerHighest,
                        colorBlendMode: BlendMode.softLight,
                      )
                    : const Center(child: Icon(Icons.apps, size: 48)),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    app.name,
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                  const SizedBox(height: 4),
                  Text(
                    app.shortDescription,
                    style: Theme.of(context).textTheme.bodySmall,
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
