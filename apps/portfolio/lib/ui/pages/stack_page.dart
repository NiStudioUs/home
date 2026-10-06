import 'package:flutter/material.dart';
import 'package:ni_design_system/ni_design_system.dart';
import '../../models/profile_data.dart';

class StackPage extends StatelessWidget {
  const StackPage({super.key});

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    final categories = ProfileData.skills['categories'] as List<Map<String, dynamic>>;

    final sections = categories.map((category) {
      final name = category['name'] as String;
      final skills = category['skills'] as List<String>;
      
      return NiStickySectionData(
        id: name,
        title: name,
        subtitle: '${skills.length} skills',
        content: NiBentoCard(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(name, style: NiType.h3(context)),
              const SizedBox(height: 16),
              Wrap(
                spacing: 8,
                runSpacing: 8,
                children: skills.map((s) => Container(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  decoration: BoxDecoration(
                    color: tokens.surface,
                    borderRadius: BorderRadius.circular(NiTokens.rSpot),
                    border: Border.all(color: tokens.border),
                  ),
                  child: Text(s.replaceAll('<br>', ' '), style: NiType.body(context)),
                )).toList(),
              ),
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
                    Text('Stack', style: NiType.h2(context)),
                    const SizedBox(height: 16),
                    Text(
                      'Tools I use.',
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
