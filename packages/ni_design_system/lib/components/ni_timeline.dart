import 'package:flutter/material.dart';
import '../theme/ni_tokens.dart';

class NiTimelineItem {
  final String date;
  final String title;
  final String description;
  final IconData? icon;

  const NiTimelineItem({
    required this.date,
    required this.title,
    required this.description,
    this.icon,
  });
}

class NiTimeline extends StatelessWidget {
  final List<NiTimelineItem> items;
  final bool ascending;

  const NiTimeline({
    super.key,
    required this.items,
    this.ascending = false,
  });

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    final sortedItems = List<NiTimelineItem>.from(items);
    
    // Sort logic (assuming dates are parseable or pre-sorted based on 'ascending')
    // We just reverse if it's descending because timeline events usually come sorted.
    if (!ascending) {
      sortedItems.reversed.toList();
    }

    return ListView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      itemCount: sortedItems.length,
      itemBuilder: (context, index) {
        final item = sortedItems[index];
        final isLast = index == sortedItems.length - 1;

        return IntrinsicHeight(
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Timeline connector
              SizedBox(
                width: 48,
                child: Column(
                  children: [
                    Container(
                      width: 12,
                      height: 12,
                      margin: const EdgeInsets.only(top: 6),
                      decoration: BoxDecoration(
                        color: tokens.accent,
                        shape: BoxShape.circle,
                        border: Border.all(color: tokens.surface, width: 2),
                      ),
                    ),
                    if (!isLast)
                      Expanded(
                        child: Container(
                          width: 2,
                          color: tokens.border,
                        ),
                      ),
                  ],
                ),
              ),
              
              // Timeline content
              Expanded(
                child: Padding(
                  padding: const EdgeInsets.only(bottom: 40.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        item.date,
                        style: NiType.eyebrow(context).copyWith(color: tokens.muted),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        item.title,
                        style: NiType.h3(context),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        item.description,
                        style: NiType.muted(context),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}
