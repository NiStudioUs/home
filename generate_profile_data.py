import json

def load_json(filepath):
    with open(filepath, 'r') as f:
        return json.load(f)

profile = load_json('/tmp/profile.json')
experience = load_json('/tmp/experience.json')
projects = load_json('/tmp/projects_summary.json')
skills = load_json('/tmp/skills.json')
awards = load_json('/tmp/awards.json')
narrative = load_json('/tmp/narrative.json')

dart_content = """// GENERATED CODE - DO NOT MODIFY BY HAND

class ProfileData {
"""

# Profile info
dart_content += f"  static const String name = '{profile['name']}';\n"
dart_content += f"  static const String title = '{profile['title']}';\n"
dart_content += f"  static const String email = '{profile['email']}';\n"
dart_content += f"  static const String summary = '''{profile['summary']}''';\n\n"

# Highlights
dart_content += "  static const List<String> highlights = [\n"
for h in profile['highlights']:
    dart_content += f"    '''{h}''',\n"
dart_content += "  ];\n\n"

# Socials
dart_content += "  static const List<Map<String, String>> socials = [\n"
for s in profile['socials']:
    dart_content += f"    {{'platform': '{s['platform']}', 'url': '{s['url']}', 'icon': '{s['icon']}'}},\n"
dart_content += "  ];\n\n"

# Experience
dart_content += "  static const List<Map<String, dynamic>> experience = [\n"
for e in experience:
    dart_content += "    {\n"
    dart_content += f"      'id': '{e.get('id', '')}',\n"
    dart_content += f"      'company': '''{e.get('company', '')}''',\n"
    dart_content += f"      'client': '''{e.get('client', '')}''',\n"
    dart_content += f"      'title': '''{e.get('title', '')}''',\n"
    dart_content += f"      'startDate': '{e.get('startDate', '')}',\n"
    dart_content += f"      'endDate': '{e.get('endDate', '')}',\n"
    dart_content += "      'bullets': [\n"
    for b in e.get('bullets', []):
        escaped_b = b.replace("'", "\\'")
        dart_content += f"        '{escaped_b}',\n"
    dart_content += "      ],\n"
    dart_content += "      'tags': [\n"
    for t in e.get('tags', []):
        dart_content += f"        '{t}',\n"
    dart_content += "      ],\n"
    dart_content += "    },\n"
dart_content += "  ];\n\n"

# Projects
dart_content += "  static const List<Map<String, dynamic>> projects = [\n"
for p in projects:
    dart_content += "    {\n"
    dart_content += f"      'id': '{p.get('id', '')}',\n"
    dart_content += f"      'name': '''{p.get('name', '')}''',\n"
    dart_content += f"      'status': '{p.get('status', '')}',\n"
    dart_content += f"      'description': '''{p.get('description', '')}''',\n"
    dart_content += f"      'version': '{p.get('version', '')}',\n"
    package_len = len(p.get('packages', []))
    dart_content += f"      'packageCount': {package_len},\n"
    dart_content += f"      'demoUrl': '{p.get('demoUrl', '')}',\n"
    dart_content += f"      'liveUrl': '{p.get('liveUrl', '')}',\n"
    dart_content += "      'tags': [\n"
    for t in p.get('tags', []):
        dart_content += f"        '{t}',\n"
    dart_content += "      ],\n"
    dart_content += "    },\n"
dart_content += "  ];\n\n"

# Skills
dart_content += "  static const Map<String, dynamic> skills = {\n"
dart_content += "    'categories': [\n"
for c in skills.get('categories', []):
    dart_content += "      {\n"
    dart_content += f"        'name': '''{c.get('name', '')}''',\n"
    dart_content += "        'skills': [\n"
    for s in c.get('skills', []):
        dart_content += f"          '''{s}''',\n"
    dart_content += "        ],\n"
    dart_content += "      },\n"
dart_content += "    ],\n"
dart_content += "  };\n\n"

# Awards
dart_content += "  static const List<Map<String, String>> awards = [\n"
for a in awards:
    dart_content += "    {\n"
    dart_content += f"      'title': '''{a.get('title', '')}''',\n"
    dart_content += f"      'date': '{a.get('date', '')}',\n"
    dart_content += f"      'description': '''{a.get('description', '')}''',\n"
    dart_content += f"      'organization': '''{a.get('organization', '')}''',\n"
    dart_content += "    },\n"
dart_content += "  ];\n\n"

# Narrative
dart_content += "  static const List<Map<String, dynamic>> narrative = [\n"
for s in narrative:
    dart_content += "      {\n"
    dart_content += f"        'id': '{s.get('id', '')}',\n"
    dart_content += f"        'title': '''{s.get('title', '')}''',\n"
    content = s.get('content', '')
    if isinstance(content, list):
        dart_content += "        'content': [\n"
        for c in content:
            dart_content += f"          '''{c}''',\n"
        dart_content += "        ],\n"
    else:
        dart_content += f"        'content': '''{content}''',\n"
    dart_content += f"        'quote': '''{s.get('quote', '')}''',\n"
    dart_content += "      },\n"
dart_content += "  ];\n\n"

dart_content += "}\n"

with open('apps/portfolio/lib/models/profile_data.dart', 'w') as f:
    f.write(dart_content)

print("Created profile_data.dart")
