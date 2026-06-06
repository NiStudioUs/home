import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import '../../models/data_model.dart';
import '../../utils/url_helper.dart';
import 'image_helper.dart';

class FlutterAppCard extends StatelessWidget {
  final FlutterAppModel app;

  const FlutterAppCard({super.key, required this.app});

  Future<void> _launchUrl() async {
    final url = Uri.parse(UrlHelper.resolve(app.path));
    if (!await launchUrl(url)) {
      throw Exception('Could not launch ${app.path}');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 2,
      clipBehavior: Clip.antiAlias,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: InkWell(
        onTap: _launchUrl,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // App Icon Placeholder with Badge
            Expanded(
              child: Container(
                color: Theme.of(context).colorScheme.surfaceContainerHighest,
                child: Stack(
                  fit: StackFit.expand,
                  children: [
                    app.iconUrl.isNotEmpty
                        ? Transform.scale(
                            scale: 1.3, // Scale up to push transparent corners out of view
                            child: Image(
                              image: getImageProvider(app.iconUrl),
                              fit: BoxFit.cover,
                            ),
                          )
                        : const Center(
                            child: Icon(Icons.rocket_launch, size: 48),
                          ),

                    // Status Badge
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
                            color: _getStatusColor(context, app.status),
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
            Padding(
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
                    app.description,
                    style: Theme.of(context).textTheme.bodySmall,
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                  const SizedBox(height: 12),
                  SizedBox(
                    width: double.infinity,
                    child: OutlinedButton(
                      onPressed: _launchUrl,
                      style: OutlinedButton.styleFrom(
                        padding: const EdgeInsets.symmetric(vertical: 12),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(8),
                        ),
                        side: BorderSide(
                          color: Theme.of(context).colorScheme.primary,
                        ),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const Text('Open App'),
                          const SizedBox(width: 8),
                          Icon(
                            Icons.arrow_forward,
                            size: 16,
                            color: Theme.of(context).colorScheme.primary,
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Color _getStatusColor(BuildContext context, String status) {
    final lowerStatus = status.toLowerCase();
    if (lowerStatus.contains('dev') || lowerStatus.contains('beta')) {
      return Colors.purple.shade600;
    } else if (lowerStatus.contains('soon')) {
      return Colors.blue.shade600;
    } else if (lowerStatus.contains('live') || lowerStatus.contains('stable')) {
      return Colors.green.shade600;
    }
    return Theme.of(context).colorScheme.primary;
  }
}
