import 'package:flutter/material.dart';
import 'package:ni_design_system/ni_design_system.dart';
import '../../models/profile_data.dart';

class TimelinePage extends StatefulWidget {
  const TimelinePage({super.key});

  @override
  State<TimelinePage> createState() => _TimelinePageState();
}

class _TimelinePageState extends State<TimelinePage> {
  bool _ascending = false;

  String _calculateDuration(String startDate, String endDate) {
    return ''; // Simplified for now
  }

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    
    var experience = List<Map<String, dynamic>>.from(ProfileData.experience);
    if (_ascending) {
      experience = experience.reversed.toList();
    }
    
    final sections = experience.map((exp) {
      final startDate = exp['startDate'] as String;
      final endDate = exp['endDate'] as String;
      final title = exp['title'] as String;
      final company = exp['company'] as String;
      final client = exp['client'] as String;
      final bullets = exp['bullets'] as List<String>;
      final tags = exp['tags'] as List<String>;
      
      // Extract years for the sidebar
      final startYearMatch = RegExp(r'\d{4}').firstMatch(startDate);
      final endYearMatch = RegExp(r'\d{4}').firstMatch(endDate);
      final startYear = startYearMatch != null ? startYearMatch.group(0)! : startDate;
      final endYear = endYearMatch != null ? endYearMatch.group(0)! : endDate;
      
      final displayYears = startYear == endYear ? startYear : '$startYear - $endYear';

      return NiStickySectionData(
        id: title + company,
        title: displayYears,
        subtitle: '$title\n$company',
        content: NiBentoCard(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(title, style: NiType.h3(context)),
                        Text('$company ${client.isNotEmpty ? '| Client: $client' : ''}', style: NiType.muted(context)),
                      ],
                    ),
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                    decoration: BoxDecoration(
                      color: tokens.surface,
                      borderRadius: BorderRadius.circular(NiTokens.rSpot),
                    ),
                    child: Text('$startDate - $endDate', style: NiType.eyebrow(context)),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              ...bullets.map((b) => Padding(
                padding: const EdgeInsets.only(bottom: 8.0),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('• ', style: TextStyle(fontSize: 16)),
                    Expanded(child: Text(b, style: NiType.doc(context))),
                  ],
                ),
              )),
              if (tags.isNotEmpty) ...[
                const SizedBox(height: 16),
                Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  children: tags.map((t) => Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                    decoration: BoxDecoration(
                      color: tokens.bg,
                      borderRadius: BorderRadius.circular(4),
                      border: Border.all(color: tokens.border),
                    ),
                    child: Text(t, style: NiType.eyebrow(context)),
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
                    Text('Timeline', style: NiType.h2(context)),
                    const SizedBox(height: 16),
                    Text(
                      'Experience and Career History.',
                      style: NiType.lead(context),
                    ),
                  ],
                ),
                footerSidebar: Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(24),
                  decoration: tokens.card(radius: NiTokens.rSpot).copyWith(
                    color: tokens.surface2,
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Sort Order', style: NiType.eyebrow(context)),
                      const SizedBox(height: 16),
                      Row(
                        children: [
                          NiButton(
                            text: 'Desc',
                            isPrimary: !_ascending,
                            large: false,
                            onTap: () => setState(() => _ascending = false),
                          ),
                          const SizedBox(width: 8),
                          NiButton(
                            text: 'Asc',
                            isPrimary: _ascending,
                            large: false,
                            onTap: () => setState(() => _ascending = true),
                          ),
                        ],
                      ),
                    ],
                  ),
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
