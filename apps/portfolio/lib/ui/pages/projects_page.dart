import 'package:flutter/material.dart';
import 'package:ni_design_system/ni_design_system.dart';
import 'package:url_launcher/url_launcher.dart';
import '../../models/profile_data.dart';

class ProjectsPage extends StatelessWidget {
  const ProjectsPage({super.key});

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    final projects = List<Map<String, dynamic>>.from(ProfileData.projects);
    
    // Sort alphabetically by name
    projects.sort((a, b) => (a['name'] as String).toLowerCase().compareTo((b['name'] as String).toLowerCase()));

    final sections = projects.map((p) {
      return NiStickySectionData(
        id: p['name'],
        title: p['name'],
        subtitle: p['status'],
        content: NiBentoCard(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Expanded(child: Text(p['name'], style: NiType.h3(context), maxLines: 1, overflow: TextOverflow.ellipsis)),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    decoration: BoxDecoration(
                      color: p['status'].toLowerCase().contains('live') ? Colors.green.withOpacity(0.2) : tokens.surface,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(p['status'], style: NiType.eyebrow(context).copyWith(
                      color: p['status'].toLowerCase().contains('live') ? Colors.green : tokens.text,
                    )),
                  ),
                ],
              ),
              const SizedBox(height: 12),
              Text(p['description'], style: NiType.body(context), maxLines: 3, overflow: TextOverflow.ellipsis),
              const SizedBox(height: 16),
              Row(
                children: [
                  Text('Version:', style: NiType.eyebrow(context)),
                  const SizedBox(width: 4),
                  Text(p['version'], style: NiType.muted(context)),
                ],
              ),
              const SizedBox(height: 16),
              Wrap(
                spacing: 4,
                runSpacing: 4,
                children: (p['tags'] as List<String>).take(3).map((t) => Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  decoration: BoxDecoration(
                    color: tokens.surface,
                    borderRadius: BorderRadius.circular(4),
                  ),
                  child: Text(t, style: NiType.eyebrow(context)),
                )).toList(),
              ),
              if (((p['demoUrl'] ?? '').isNotEmpty && p['demoUrl'] != 'None') || ((p['liveUrl'] ?? '').isNotEmpty && p['liveUrl'] != 'None')) ...[
                const SizedBox(height: 16),
                NiButton(
                  text: 'Live Demo',
                  isPrimary: true,
                  onTap: () async {
                    final hasDemo = (p['demoUrl'] ?? '').isNotEmpty && p['demoUrl'] != 'None';
                    final urlString = hasDemo ? p['demoUrl'] : p['liveUrl'];
                    if (urlString != null && urlString.isNotEmpty) {
                      final uri = Uri.parse(urlString);
                      if (await canLaunchUrl(uri)) {
                        await launchUrl(uri);
                      }
                    }
                  },
                ),
              ]
            ],
          ),
        ),
      );
    }).toList();

    return Scaffold(
      backgroundColor: tokens.bg,
      body: Align(
        alignment: Alignment.topCenter,
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: NiTokens.maxWidth),
          child: Padding(
            padding: const EdgeInsets.only(top: 40, bottom: 80, left: NiTokens.gutter, right: NiTokens.gutter),
            child: SizedBox.expand(
              child: NiStickySidebarLayout(
                headerSidebar: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Projects', style: NiType.h2(context)),
                    const SizedBox(height: 16),
                    Text(
                      'A-Z Showcase.',
                      style: NiType.lead(context),
                    ),
                  ],
                ),
                sections: sections,
              ),
            ),
          ),
        ),
      ),
    );
  }
}
