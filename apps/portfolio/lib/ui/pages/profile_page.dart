import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:ni_design_system/ni_design_system.dart';
import 'package:url_launcher/url_launcher.dart';
import '../../models/profile_data.dart';

class ProfilePage extends StatelessWidget {
  const ProfilePage({super.key});

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    final featuredProjects = ProfileData.projects.take(3).toList();
    final recentExperience = ProfileData.experience.take(2).toList();
    
    return Scaffold(
      backgroundColor: tokens.bg,
      body: SingleChildScrollView(
        padding: const EdgeInsets.only(top: 40, bottom: 80),
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: NiTokens.maxWidth),
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: NiTokens.gutter),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Hero Section
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Container(
                        width: 100,
                        height: 100,
                        decoration: BoxDecoration(
                          color: tokens.surface,
                          shape: BoxShape.circle,
                          border: Border.all(color: tokens.border),
                        ),
                        alignment: Alignment.center,
                        child: Text('KS', style: NiType.h1(context)),
                      ),
                      const SizedBox(width: 32),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('> ${ProfileData.name}_', style: NiType.h1(context)),
                            const SizedBox(height: 8),
                            Text(ProfileData.title, style: NiType.lead(context)),
                            const SizedBox(height: 16),
                            Text(ProfileData.summary, style: NiType.doc(context)),
                            const SizedBox(height: 24),
                            Row(
                              children: [
                                NiButton(
                                  text: 'View Experience',
                                  isPrimary: true,
                                  onTap: () => context.go('/profile/timeline'),
                                ),
                                const SizedBox(width: 16),
                                NiButton(
                                  text: 'Explore Projects',
                                  onTap: () => context.go('/profile/projects'),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 64),
                  
                  // Stats Section
                  Row(
                    children: [
                      _StatCard(value: '9+', label: 'Years Experience'),
                      const SizedBox(width: 16),
                      _StatCard(value: '${ProfileData.experience.map((e) => e['company']).toSet().length}', label: 'Companies'),
                      const SizedBox(width: 16),
                      _StatCard(value: '${ProfileData.projects.length}', label: 'Apps Built'),
                      const SizedBox(width: 16),
                      _StatCard(value: '${ProfileData.projects.where((p) => p['status'].contains('Live')).length}', label: 'Apps Live'),
                    ],
                  ),
                  const SizedBox(height: 64),
                  
                  // Core Tech Stack
                  Text('Core Tech Stack', style: NiType.h2(context)),
                  const SizedBox(height: 24),
                  NiBentoCard(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        ...ProfileData.skills['categories'].take(4).map<Widget>((category) {
                          return Padding(
                            padding: const EdgeInsets.symmetric(vertical: 8.0),
                            child: Row(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                SizedBox(
                                  width: 200,
                                  child: Text(category['name'], style: NiType.body(context).copyWith(fontWeight: FontWeight.bold)),
                                ),
                                Expanded(
                                  child: Text((category['skills'] as List<String>).join(', ').replaceAll('<br>', ''), style: NiType.muted(context)),
                                ),
                              ],
                            ),
                          );
                        }).toList(),
                      ],
                    ),
                  ),
                  const SizedBox(height: 16),
                  Align(
                    alignment: Alignment.centerRight,
                    child: TextButton(
                      onPressed: () => context.go('/profile/stack'),
                      child: const Text('View Full Stack →'),
                    ),
                  ),
                  const SizedBox(height: 64),
                  
                  // Featured Projects
                  Text('Featured Projects', style: NiType.h2(context)),
                  const SizedBox(height: 24),
                  GridView.builder(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount: 3,
                      crossAxisSpacing: 16,
                      mainAxisSpacing: 16,
                      childAspectRatio: 0.8,
                    ),
                    itemCount: featuredProjects.length,
                    itemBuilder: (context, index) {
                      final p = featuredProjects[index];
                      return _ProjectCard(project: p);
                    },
                  ),
                  const SizedBox(height: 16),
                  Align(
                    alignment: Alignment.centerRight,
                    child: TextButton(
                      onPressed: () => context.go('/profile/projects'),
                      child: const Text('View All Projects →'),
                    ),
                  ),
                  const SizedBox(height: 64),

                  // Recent Experience
                  Text('Recent Experience', style: NiType.h2(context)),
                  const SizedBox(height: 24),
                  ...recentExperience.map((exp) {
                    final bullets = exp['bullets'] as List<String>;
                    return Padding(
                      padding: const EdgeInsets.only(bottom: 16.0),
                      child: NiBentoCard(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(exp['title'], style: NiType.h3(context)),
                                    Text('${exp['company']} ${exp['client'].isNotEmpty ? '| Client: ${exp['client']}' : ''}', style: NiType.muted(context)),
                                  ],
                                ),
                                Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                                  decoration: BoxDecoration(
                                    color: tokens.surface,
                                    borderRadius: BorderRadius.circular(NiTokens.rSpot),
                                  ),
                                  child: Text('${exp['startDate']} - ${exp['endDate']}', style: NiType.eyebrow(context)),
                                ),
                              ],
                            ),
                            const SizedBox(height: 16),
                            ...bullets.map((b) => Padding(
                              padding: const EdgeInsets.only(bottom: 4.0),
                              child: Row(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const Text('• ', style: TextStyle(fontSize: 16)),
                                  Expanded(child: Text(b, style: NiType.doc(context))),
                                ],
                              ),
                            )),
                          ],
                        ),
                      ),
                    );
                  }).toList(),
                  const SizedBox(height: 16),
                  Align(
                    alignment: Alignment.centerRight,
                    child: TextButton(
                      onPressed: () => context.go('/profile/timeline'),
                      child: const Text('Read Full History →'),
                    ),
                  ),
                  const SizedBox(height: 64),

                  // Awards & Accomplishments
                  Text('Awards & Accomplishments', style: NiType.h2(context)),
                  const SizedBox(height: 24),
                  GridView.builder(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount: 3,
                      crossAxisSpacing: 16,
                      mainAxisSpacing: 16,
                      childAspectRatio: 1.2,
                    ),
                    itemCount: ProfileData.awards.length,
                    itemBuilder: (context, index) {
                      final a = ProfileData.awards[index];
                      return NiBentoCard(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(a['title']!, style: NiType.h3(context)),
                            const SizedBox(height: 8),
                            Text(a['description']!, style: NiType.body(context), maxLines: 4, overflow: TextOverflow.ellipsis),
                            const Spacer(),
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                              decoration: BoxDecoration(
                                color: tokens.surface,
                                borderRadius: BorderRadius.circular(4),
                              ),
                              child: Text(a['organization']!, style: NiType.eyebrow(context)),
                            ),
                          ],
                        ),
                      );
                    },
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _StatCard extends StatelessWidget {
  final String value;
  final String label;

  const _StatCard({required this.value, required this.label});

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: NiBentoCard(
        child: Column(
          children: [
            Text(value, style: NiType.h1(context)),
            const SizedBox(height: 8),
            Text(label, style: NiType.muted(context)),
          ],
        ),
      ),
    );
  }
}

class _ProjectCard extends StatelessWidget {
  final Map<String, dynamic> project;

  const _ProjectCard({required this.project});

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    return NiBentoCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Expanded(child: Text(project['name'], style: NiType.h3(context), maxLines: 1, overflow: TextOverflow.ellipsis)),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: project['status'].toLowerCase().contains('live') ? Colors.green.withOpacity(0.2) : tokens.surface,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Text(project['status'], style: NiType.eyebrow(context).copyWith(
                  color: project['status'].toLowerCase().contains('live') ? Colors.green : tokens.text,
                )),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Text(project['description'], style: NiType.body(context), maxLines: 3, overflow: TextOverflow.ellipsis),
          const SizedBox(height: 16),
          Row(
            children: [
              Text('Version:', style: NiType.eyebrow(context)),
              const SizedBox(width: 4),
              Text(project['version'], style: NiType.muted(context)),
            ],
          ),
          const Spacer(),
          Wrap(
            spacing: 4,
            runSpacing: 4,
            children: (project['tags'] as List<String>).take(3).map((t) => Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
              decoration: BoxDecoration(
                color: tokens.surface,
                borderRadius: BorderRadius.circular(4),
              ),
              child: Text(t, style: NiType.eyebrow(context)),
            )).toList(),
          ),
          if (((project['demoUrl'] ?? '').isNotEmpty && project['demoUrl'] != 'None') || ((project['liveUrl'] ?? '').isNotEmpty && project['liveUrl'] != 'None')) ...[
            const SizedBox(height: 16),
            NiButton(
              text: 'Live Demo',
              isPrimary: true,
              onTap: () async {
                final hasDemo = (project['demoUrl'] ?? '').isNotEmpty && project['demoUrl'] != 'None';
                final urlString = hasDemo ? project['demoUrl'] : project['liveUrl'];
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
    );
  }
}
