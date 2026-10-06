import 'package:flutter/material.dart';
import 'package:ni_design_system/ni_design_system.dart';
import '../../models/profile_data.dart';

class StoryPage extends StatelessWidget {
  const StoryPage({super.key});

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    final narrative = ProfileData.narrative;
    
    final sections = narrative.map((section) {
      final title = section['project'] ?? section['title'] ?? '';
      final year = section['year'] ?? '';
      final company = section['company'] ?? '';
      
      return NiStickySectionData(
        id: title,
        title: title,
        subtitle: year,
        content: NiBentoCard(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(title, style: NiType.h3(context)),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                    decoration: BoxDecoration(
                      color: tokens.surface,
                      borderRadius: BorderRadius.circular(NiTokens.rSpot),
                    ),
                    child: Text(year, style: NiType.eyebrow(context)),
                  ),
                ],
              ),
              const SizedBox(height: 4),
              Text(company, style: NiType.muted(context)),
              const SizedBox(height: 16),
              Text(section['description'] ?? section['content'] ?? '', style: NiType.doc(context)),
              if (section.containsKey('tags') && section['tags'] is List) ...[
                const SizedBox(height: 16),
                Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  children: (section['tags'] as List).map((t) => Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                    decoration: BoxDecoration(
                      color: tokens.bg,
                      borderRadius: BorderRadius.circular(4),
                      border: Border.all(color: tokens.border),
                    ),
                    child: Text(t.toString(), style: NiType.eyebrow(context)),
                  )).toList(),
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
                    Text('Story', style: NiType.h2(context)),
                    const SizedBox(height: 16),
                    Text(
                      'The journey so far.',
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
