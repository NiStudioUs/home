import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import '../../models/data_model.dart';

class LearningProjectCard extends StatelessWidget {
  final LearningProjectModel project;

  const LearningProjectCard({super.key, required this.project});

  Future<void> _launchUrl() async {
    final url = Uri.parse(project.path);
    if (!await launchUrl(url)) {
      throw Exception('Could not launch ${project.path}');
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
            // Project Image Placeholder
            Expanded(
              child: Container(
                color: Theme.of(context).colorScheme.surfaceContainerHighest,
                child: project.imageUrl != null
                    ? Image.asset(
                        project.imageUrl!,
                        fit: BoxFit.cover,
                      )
                    : const Center(child: Icon(Icons.code, size: 48)),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    project.title,
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                  const SizedBox(height: 4),
                  Text(
                    project.description,
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
