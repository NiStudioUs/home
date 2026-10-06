import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../models/data_model.dart';
import '../design_tokens.dart';

class StatsRow extends StatelessWidget {
  const StatsRow({super.key});

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    final dataModel = Provider.of<DataModel>(context);
    final isMobile = NiTokens.isMobile(context);
    
    final appsCount = dataModel.apps.length;
    final featuresCount = dataModel.apps.fold(0, (sum, app) => sum + app.features.length);
    final policiesCount = appsCount * 2;

    return Center(
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: NiTokens.maxWidth),
        child: Padding(
          padding: const EdgeInsets.fromLTRB(NiTokens.gutter, 38, NiTokens.gutter, 56),
          child: isMobile
            ? Column(
                children: [
                  Row(
                    children: [
                      Expanded(child: _StatItem(number: '$appsCount', label: 'apps shipped')),
                      Expanded(child: _StatItem(number: '$featuresCount', label: 'feature areas')),
                    ],
                  ),
                  const SizedBox(height: 20),
                  Row(
                    children: [
                      Expanded(child: _StatItem(number: '$policiesCount', label: 'plain-language policies')),
                      const Expanded(child: _StatItem(number: '0', label: 'ads')),
                    ],
                  ),
                ],
              )
            : Row(
                children: [
                  Expanded(child: _StatItem(number: '$appsCount', label: 'apps shipped')),
                  Expanded(child: _StatItem(number: '$featuresCount', label: 'feature areas')),
                  Expanded(child: _StatItem(number: '$policiesCount', label: 'plain-language policies')),
                  const Expanded(child: _StatItem(number: '0', label: 'ads')),
                ],
              ),
        ),
      ),
    );
  }
}

class _StatItem extends StatelessWidget {
  final String number;
  final String label;

  const _StatItem({required this.number, required this.label});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(number, style: NiType.statNum(context)),
        const SizedBox(height: 4),
        Text(label, style: NiType.stat(context)),
      ],
    );
  }
}
