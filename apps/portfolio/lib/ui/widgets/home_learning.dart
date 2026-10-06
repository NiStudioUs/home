import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:url_launcher/url_launcher.dart';
import '../../models/data_model.dart';
import '../design_tokens.dart';
import '../../utils/url_helper.dart';

class HomeLearning extends StatelessWidget {
  const HomeLearning({super.key});

  @override
  Widget build(BuildContext context) {
    final dataModel = Provider.of<DataModel>(context);
    
    return Center(
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: NiTokens.maxWidth),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: NiTokens.gutter),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _SectionHead(
                eyebrow: 'Learning lab',
                title: 'Web experiments, chapter by chapter',
                subtitle: 'Side projects where new web stacks get stress-tested.',
              ),
              const SizedBox(height: 44),
              LayoutBuilder(
                builder: (context, constraints) {
                  final minWidth = 250.0;
                  final crossAxisCount = (constraints.maxWidth / minWidth).floor().clamp(1, 4);
                  
                  return GridView.builder(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount: crossAxisCount,
                      crossAxisSpacing: 20,
                      mainAxisSpacing: 20,
                      childAspectRatio: 0.55,
                    ),
                    itemCount: dataModel.learningProjects.length,
                    itemBuilder: (context, index) {
                      return _LearningCard(project: dataModel.learningProjects[index], chapterNum: index + 1);
                    },
                  );
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _SectionHead extends StatelessWidget {
  final String eyebrow;
  final String title;
  final String subtitle;

  const _SectionHead({required this.eyebrow, required this.title, required this.subtitle});

  @override
  Widget build(BuildContext context) {
    return ConstrainedBox(
      constraints: const BoxConstraints(maxWidth: 720),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(eyebrow.toUpperCase(), style: NiType.eyebrow(context)),
          const SizedBox(height: 14),
          Text(title, style: NiType.h2(context)),
          const SizedBox(height: 14),
          Text(subtitle, style: NiType.muted(context)),
        ],
      ),
    );
  }
}

class _LearningCard extends StatefulWidget {
  final LearningProjectModel project;
  final int chapterNum;

  const _LearningCard({required this.project, required this.chapterNum});

  @override
  State<_LearningCard> createState() => _LearningCardState();
}

class _LearningCardState extends State<_LearningCard> {
  bool _isHovered = false;

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    
    // Extract actual title without "Chapter N:"
    final titleParts = widget.project.title.split(':');
    final title = titleParts.length > 1 ? titleParts[1].trim() : widget.project.title;
    
    return MouseRegion(
      onEnter: (_) => setState(() => _isHovered = true),
      onExit: (_) => setState(() => _isHovered = false),
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        onTap: () => launchUrl(Uri.parse(UrlHelper.resolve(widget.project.path))),
        child: AnimatedContainer(
          duration: NiTokens.hoverFast,
          transform: Matrix4.translationValues(0, _isHovered ? -5 : 0, 0),
          decoration: BoxDecoration(
            color: tokens.surface,
            borderRadius: BorderRadius.circular(NiTokens.r),
            border: Border.all(color: _isHovered ? tokens.accent : tokens.border, width: 1),
          ),
          clipBehavior: Clip.antiAlias,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Image Area
              AspectRatio(
                aspectRatio: 16 / 10,
                child: AnimatedScale(
                  scale: _isHovered ? 1.05 : 1.0,
                  duration: const Duration(milliseconds: 500),
                  child: (widget.project.imageUrl?.isNotEmpty ?? false)
                      ? Image.asset(
                          widget.project.imageUrl!,
                          fit: BoxFit.cover,
                          alignment: Alignment.topCenter,
                        )
                      : Container(
                          decoration: BoxDecoration(
                            gradient: LinearGradient(
                              colors: [tokens.surface2, tokens.bgAlt],
                              begin: Alignment.topLeft,
                              end: Alignment.bottomRight,
                            ),
                          ),
                          child: Center(
                            child: Text(
                              'Chapter ${widget.chapterNum}',
                              style: NiType.heroH1(context).copyWith(
                                fontSize: 32, // approx 2rem
                                color: tokens.accent.withOpacity(0.5),
                              ),
                            ),
                          ),
                        ),
                ),
              ),
              // Body Area
              Expanded(
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(18, 20, 18, 22),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('CHAPTER ${widget.chapterNum}', style: NiType.eyebrow(context).copyWith(fontSize: 11.52)), // .72rem
                    const SizedBox(height: 8),
                    Text(title, style: NiType.h3(context)),
                    const SizedBox(height: 8),
                    Text(
                      widget.project.description,
                      style: NiType.muted(context, 14.4), // .9rem
                      maxLines: 4,
                      overflow: TextOverflow.ellipsis,
                    ),
                    const SizedBox(height: 14),
                    Wrap(
                      spacing: 8,
                      runSpacing: 8,
                      children: widget.project.tags.map((t) => Container(
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                        decoration: BoxDecoration(
                          color: tokens.surface2,
                          borderRadius: NiTokens.pill,
                          border: Border.all(color: tokens.border, width: 1),
                        ),
                        child: Text(t, style: NiType.tag(context)),
                      )).toList(),
                    ),
                  ],
                ),
              ),
              ), // Close Expanded
            ],
          ),
        ),
      ),
    );
  }
}
