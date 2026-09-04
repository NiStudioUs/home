import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../models/data_model.dart';
import '../../utils/url_helper.dart';
import '../../utils/constants.dart';
import 'image_helper.dart';

class FlutterAppCard extends StatefulWidget {
  final FlutterAppModel app;

  const FlutterAppCard({super.key, required this.app});

  @override
  State<FlutterAppCard> createState() => _FlutterAppCardState();
}

class _FlutterAppCardState extends State<FlutterAppCard> {
  bool _isHovered = false;

  Future<void> _launchUrl() async {
    final url = Uri.parse(UrlHelper.resolve(widget.app.path));
    if (!await launchUrl(url)) {
      throw Exception('Could not launch ${widget.app.path}');
    }
  }

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (_) => setState(() => _isHovered = true),
      onExit: (_) => setState(() => _isHovered = false),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeOutCubic,
        transform: Matrix4.translationValues(0.0, _isHovered ? -8.0 : 0.0, 0.0)
          ..multiply(Matrix4.diagonal3Values(_isHovered ? 1.02 : 1.0, _isHovered ? 1.02 : 1.0, 1.0)),
        decoration: BoxDecoration(
          color: Theme.of(context).colorScheme.surface,
          borderRadius: BorderRadius.circular(32),
          boxShadow: [
            BoxShadow(
              color: _isHovered
                  ? Theme.of(context).colorScheme.primary.withValues(alpha: 0.15)
                  : Colors.black.withValues(alpha: 0.05),
              blurRadius: _isHovered ? 20 : 10,
              offset: Offset(0, _isHovered ? 10 : 4),
            ),
          ],
          border: Border.all(
            color: _isHovered
                ? Theme.of(context).colorScheme.primary.withValues(alpha: 0.5)
                : Theme.of(context).colorScheme.outlineVariant.withValues(alpha: 0.5),
            width: 1.5,
          ),
        ),
        clipBehavior: Clip.antiAlias,
        child: Stack(
          fit: StackFit.passthrough,
          children: [
            Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                // App Icon Placeholder with Badge
                Expanded(
                  child: Container(
                    color: Theme.of(context).colorScheme.surfaceContainerHighest,
                    child: Stack(
                      fit: StackFit.expand,
                      children: [
                        widget.app.iconUrl.isNotEmpty
                            ? Transform.scale(
                                scale: UIConstants.cardImageScale,
                                child: Image(
                                  image: getImageProvider(widget.app.iconUrl),
                                  fit: BoxFit.cover,
                                ),
                              )
                            : const Center(
                                child: Icon(Icons.rocket_launch, size: 48),
                              ),
  
                        // Status Badge
                        if (widget.app.status.isNotEmpty)
                          Positioned(
                            top: 16,
                            right: 16,
                            child: Container(
                              padding: const EdgeInsets.symmetric(
                                horizontal: 12,
                                vertical: 6,
                              ),
                              decoration: BoxDecoration(
                                color: _getStatusColor(context, widget.app.status),
                                borderRadius: BorderRadius.circular(20),
                                boxShadow: [
                                  BoxShadow(
                                    color: Colors.black.withValues(alpha: 0.2),
                                    blurRadius: 8,
                                    offset: const Offset(0, 4),
                                  ),
                                ],
                              ),
                              child: Text(
                                widget.app.status.toUpperCase(),
                                style: Theme.of(context).textTheme.labelSmall
                                    ?.copyWith(
                                      fontWeight: FontWeight.bold,
                                      color: Colors.white,
                                      letterSpacing: 1.2,
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
                  padding: const EdgeInsets.all(24.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      if (widget.app.tags.isNotEmpty) ...[
                        SizedBox(
                          height: 28,
                          child: ListView.separated(
                            scrollDirection: Axis.horizontal,
                            itemCount: widget.app.tags.length,
                            separatorBuilder: (context, index) =>
                                const SizedBox(width: 8),
                            itemBuilder: (context, index) {
                              return Container(
                                padding: const EdgeInsets.symmetric(
                                  horizontal: 12,
                                  vertical: 4,
                                ),
                                decoration: BoxDecoration(
                                  color: Theme.of(context)
                                      .colorScheme
                                      .secondaryContainer,
                                  borderRadius: BorderRadius.circular(8),
                                ),
                                child: Center(
                                  child: Text(
                                    widget.app.tags[index],
                                    style: Theme.of(context).textTheme.labelSmall?.copyWith(
                                          color: Theme.of(context).colorScheme.onSecondaryContainer,
                                          fontWeight: FontWeight.bold,
                                        ),
                                  ),
                                ),
                              );
                            },
                          ),
                        ),
                        const SizedBox(height: 12),
                      ],
                      Text(
                        widget.app.name,
                        style: Theme.of(context).textTheme.titleLarge?.copyWith(
                          fontWeight: FontWeight.w900,
                          letterSpacing: -0.5,
                        ),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                      const SizedBox(height: 8),
                      Text(
                        widget.app.description,
                        style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                          color: Theme.of(context).colorScheme.onSurfaceVariant,
                        ),
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                      ),
                      const SizedBox(height: 20),
                      SizedBox(
                        width: double.infinity,
                        // Make sure button is above inkwell if we want it clickable,
                        // but the stack has inkwell on top. Wait! The button won't be clickable!
                        // The inkwell takes all taps!
                        child: FilledButton.tonalIcon(
                          onPressed: _launchUrl,
                          icon: const Icon(Icons.arrow_forward_rounded, size: 18),
                          label: const Text('Open App'),
                          style: FilledButton.styleFrom(
                            padding: const EdgeInsets.symmetric(vertical: 16),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(16),
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
            Positioned.fill(
              child: Material(
                color: Colors.transparent,
                child: InkWell(
                  onTap: _launchUrl,
                  hoverColor: Theme.of(context).colorScheme.primary.withValues(alpha: 0.1),
                  splashColor: Theme.of(context).colorScheme.primary.withValues(alpha: 0.2),
                  highlightColor: Theme.of(context).colorScheme.primary.withValues(alpha: 0.1),
                ),
              ),
            ),
          ],
        ),
      ),
    ).animate().fadeIn(duration: 500.ms).slideY(begin: 0.1);
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
