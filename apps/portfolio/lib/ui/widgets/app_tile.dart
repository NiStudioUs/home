import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../models/data_model.dart';
import '../../utils/constants.dart';
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
                color: Theme.of(context).colorScheme.primaryContainer.withValues(alpha: 0.3),
                child: Stack(
                  fit: StackFit.expand,
                  children: [
                    app.iconUrl.isNotEmpty
                        ? Transform.scale(
                            scale: UIConstants.cardImageScale,
                            child: Image(
                              image: getImageProvider(app.iconUrl),
                              fit: BoxFit.cover,
                            ),
                          )
                        : const Center(child: Icon(Icons.apps, size: 48)),
                    if (app.status.isNotEmpty)
                      Positioned(
                        top: 12,
                        right: 12,
                        child: Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 8,
                            vertical: 4,
                          ),
                          decoration: BoxDecoration(
                            color: _getStatusColor(context, app.statusColor),
                            borderRadius: BorderRadius.circular(12),
                            boxShadow: [
                              BoxShadow(
                                color: Colors.black.withValues(alpha: 0.2),
                                blurRadius: 4,
                                offset: const Offset(0, 2),
                              ),
                            ],
                          ),
                          child: Text(
                            app.status.toUpperCase(),
                            style: Theme.of(context).textTheme.labelSmall
                                ?.copyWith(
                                  fontWeight: FontWeight.bold,
                                  color: Colors.white,
                                  letterSpacing: 1.1,
                                ),
                          ),
                        ),
                      ),
                  ],
                ),
              ),
            ),
            Container(
              color: Theme.of(context).colorScheme.surface,
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  if (app.tags.isNotEmpty) ...[
                    SizedBox(
                      height: 24,
                      child: ListView.separated(
                        scrollDirection: Axis.horizontal,
                        itemCount: app.tags.length,
                        separatorBuilder: (context, index) =>
                            const SizedBox(width: 4),
                        itemBuilder: (context, index) {
                          return Container(
                            padding: const EdgeInsets.symmetric(
                              horizontal: 8,
                              vertical: 2,
                            ),
                            decoration: BoxDecoration(
                              color: Theme.of(context)
                                  .colorScheme
                                  .primaryContainer
                                  .withValues(alpha: 0.5),
                              borderRadius: BorderRadius.circular(4),
                              border: Border.all(
                                color: Theme.of(
                                  context,
                                ).colorScheme.outline.withValues(alpha: 0.2),
                              ),
                            ),
                            child: Center(
                              child: Text(
                                app.tags[index],
                                style: Theme.of(
                                  context,
                                ).textTheme.labelSmall?.copyWith(fontSize: 10),
                              ),
                            ),
                          );
                        },
                      ),
                    ),
                    const SizedBox(height: 8),
                  ],
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

  Color _getStatusColor(BuildContext context, String colorName) {
    switch (colorName.toLowerCase()) {
      case 'amber':
      case 'warning':
        return Colors.amber.shade700;
      case 'red':
      case 'error':
        return Colors.red.shade600;
      case 'green':
      case 'success':
        return Colors.green.shade600;
      case 'blue':
      case 'info':
        return Colors.blue.shade600;
      case 'purple':
        return Colors.purple.shade500;
      default:
        return Theme.of(context).colorScheme.primary;
    }
  }
}
