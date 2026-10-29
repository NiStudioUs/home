import 'package:flutter_test/flutter_test.dart';
import 'package:nistudious_website/models/data_model.dart';

void main() {
  group('MilestoneModel', () {
    test('fromJson with full object including screenshot map', () {
      final json = {
        'date': '2026-10-29',
        'title': 'Published to Internal Testing',
        'description': 'Alarm Clock internal testing release.',
        'screenshot': {
          'url': 'assets/images/shot.webp',
          'caption': 'Ring screen',
        },
      };

      final model = MilestoneModel.fromJson(json);

      expect(model.date, '2026-10-29');
      expect(model.title, 'Published to Internal Testing');
      expect(model.description, 'Alarm Clock internal testing release.');
      expect(model.screenshot.url, 'assets/images/shot.webp');
      expect(model.screenshot.caption, 'Ring screen');
      expect(model.parsedDate, DateTime(2026, 10, 29));
    });

    test('fromJson with screenshot as bare string', () {
      final json = {
        'date': '2026-10-29',
        'title': 'Bare String Screenshot',
        'description': 'Description text',
        'screenshot': 'assets/images/shot.webp',
      };

      final model = MilestoneModel.fromJson(json);

      expect(model.screenshot.url, 'assets/images/shot.webp');
      expect(model.screenshot.caption, '');
    });

    test('fromJson with no screenshot key', () {
      final json = {
        'date': '2026-10-29',
        'title': 'No Screenshot',
        'description': 'Description text',
      };

      final model = MilestoneModel.fromJson(json);

      expect(model.screenshot.url, '');
      expect(model.screenshot.caption, '');
    });

    test('parsedDate falls back to 1970 on invalid date string', () {
      final model = MilestoneModel(
        date: 'invalid-date',
        title: 'Invalid Date',
        description: '',
      );

      expect(model.parsedDate, DateTime(1970));
    });

    test('formattedDate formats date-only string properly', () {
      final model = MilestoneModel(
        date: '2026-10-29',
        title: 'Date Only',
        description: '',
      );

      expect(model.formattedDate, 'Oct 29, 2026');
    });

    test('formattedDate formats date with time into 12-hour AM/PM string', () {
      final model = MilestoneModel(
        date: '2026-10-29 18:19',
        title: 'Date With Time',
        description: '',
      );

      expect(model.formattedDate, 'Oct 29, 2026 • 6:19 PM');
    });
  });

  group('AppModel with milestones', () {
    final baseAppJson = {
      'id': 'test-app',
      'name': 'Test App',
      'shortDescription': 'Short description',
      'fullDescription': 'Full description',
      'iconUrl': 'icon.png',
      'tags': ['utility'],
      'features': <dynamic>[],
      'links': <dynamic>[],
    };

    test('fromJson with no milestones key defaults to empty list', () {
      final app = AppModel.fromJson(Map<String, dynamic>.from(baseAppJson));

      expect(app.milestones, isEmpty);
    });

    test('fromJson with populated milestones key parses list correctly', () {
      final json = Map<String, dynamic>.from(baseAppJson)
        ..['milestones'] = [
          {
            'date': '2026-10-29',
            'title': 'Milestone 1',
            'description': 'First milestone',
          },
          {
            'date': '2026-10-30',
            'title': 'Milestone 2',
            'description': 'Second milestone',
            'screenshot': 'shot2.png',
          },
        ];

      final app = AppModel.fromJson(json);

      expect(app.milestones.length, 2);
      expect(app.milestones[0].title, 'Milestone 1');
      expect(app.milestones[0].screenshot.url, '');
      expect(app.milestones[1].title, 'Milestone 2');
      expect(app.milestones[1].screenshot.url, 'shot2.png');
    });
  });
}
