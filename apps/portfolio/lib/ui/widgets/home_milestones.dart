import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../models/data_model.dart';
import '../design_tokens.dart';
import 'card_marquee.dart';
import 'milestone_card.dart';

class HomeMilestones extends StatelessWidget {
  const HomeMilestones({super.key});

  @override
  Widget build(BuildContext context) {
    final dataModel = Provider.of<DataModel>(context);
    final entries = <({MilestoneModel milestone, AppModel app})>[];

    for (final app in dataModel.apps) {
      for (final milestone in app.milestones) {
        entries.add((milestone: milestone, app: app));
      }
    }

    if (entries.isEmpty) {
      return const SizedBox.shrink();
    }

    entries.sort((a, b) => b.milestone.parsedDate.compareTo(a.milestone.parsedDate));

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: NiTokens.maxWidth),
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: NiTokens.gutter),
              child: ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 720),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('MILESTONES', style: NiType.eyebrow(context)),
                    const SizedBox(height: 14),
                    Text('Shipping in public', style: NiType.h2(context)),
                  ],
                ),
              ),
            ),
          ),
        ),
        const SizedBox(height: 36),
        CardMarquee(
          cards: entries
              .map((e) => MilestoneCard(milestone: e.milestone, app: e.app))
              .toList(),
        ),
      ],
    );
  }
}
