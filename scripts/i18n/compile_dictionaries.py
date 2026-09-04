# -*- coding: utf-8 -*-
"""
Compiler script to merge all i18n modules into src/i18n/ui/{en,pt,id,ar}.json
Ensures 100% key parity across all 4 languages.
"""

import json
import os
import sys

from scripts.i18n.mod_common_tags_share_forms import (
    COMMON_EXPANSIONS,
    TAGS_DATA,
    SHARE_DATA,
    FORMS_DATA,
)
from scripts.i18n.mod_faqs import FAQS_DATA
from scripts.i18n.mod_tools_sections import SECTIONS_DATA
from scripts.i18n.mod_ui_expansions import UI_EXPANSIONS
from scripts.i18n.mod_data import DATA_MODELS

LANGS = ['en', 'pt', 'id', 'ar']

def deep_merge(target, source):
    """Recursively merge dict source into dict target."""
    for key, val in source.items():
        if isinstance(val, dict):
            target_val = target.setdefault(key, {})
            if isinstance(target_val, dict):
                deep_merge(target_val, val)
            else:
                target[key] = val
        else:
            target[key] = val
    return target

def compile_all():
    dictionaries = {}

    for lang in LANGS:
        filepath = f'src/i18n/ui/{lang}.json'
        if os.path.exists(filepath):
            with open(filepath, 'r', encoding='utf-8') as f:
                dictionaries[lang] = json.load(f)
        else:
            dictionaries[lang] = {}

    for lang in LANGS:
        d = dictionaries[lang]

        # 1. Expand common namespace
        if 'common' not in d:
            d['common'] = {}
        deep_merge(d['common'], COMMON_EXPANSIONS[lang])

        # 2. Add tags namespace
        d['tags'] = TAGS_DATA[lang]

        # 3. Add share namespace
        d['share'] = SHARE_DATA[lang]

        # 4. Add forms namespace
        d['forms'] = FORMS_DATA[lang]

        # 5. Add faq namespace
        d['faq'] = FAQS_DATA[lang]

        # 6. Merge tool sections
        for tool, tool_sections in SECTIONS_DATA.items():
            if tool not in d:
                d[tool] = {}
            # Each section inside tool_sections has key -> {lang: text}
            for section_name, section_content in tool_sections.items():
                section_dict = {}
                for k, lang_map in section_content.items():
                    section_dict[k] = lang_map.get(lang, lang_map.get('en', ''))
                if section_name not in d[tool]:
                    d[tool][section_name] = {}
                deep_merge(d[tool][section_name], section_dict)

        # 6b. Merge UI expansions
        for tool, tool_expansions in UI_EXPANSIONS.items():
            if tool not in d:
                d[tool] = {}
            for section_name, section_content in tool_expansions.items():
                section_dict = {}
                for k, lang_map in section_content.items():
                    section_dict[k] = lang_map.get(lang, lang_map.get('en', ''))
                if section_name not in d[tool]:
                    d[tool][section_name] = {}
                deep_merge(d[tool][section_name], section_dict)

        # 7. Add data namespace
        d['data'] = {}
        # birthstones: dict of '1'..'12' -> {name, meaning}
        d['data']['birthstones'] = {}
        for m_num, m_data in DATA_MODELS['birthstones'].items():
            d['data']['birthstones'][m_num] = {
                'name': m_data['name'][lang],
                'meaning': m_data['meaning'][lang],
            }

        # birthFlowers: dict of '1'..'12' -> {name, meaning}
        d['data']['birthFlowers'] = {}
        for m_num, m_data in DATA_MODELS['birthFlowers'].items():
            d['data']['birthFlowers'][m_num] = {
                'name': m_data['name'][lang],
                'meaning': m_data['meaning'][lang],
            }

        # generations: list of {name, shortName, startYear, endYear, description}
        d['data']['generations'] = []
        for g in DATA_MODELS['generations']:
            d['data']['generations'].append({
                'name': g['name'][lang],
                'shortName': g['shortName'][lang],
                'startYear': g['startYear'],
                'endYear': g['endYear'],
                'description': g['description'][lang],
            })

        # zodiac: dict of sign_id -> {name, element, traits}
        d['data']['zodiac'] = {}
        for z_id, z_data in DATA_MODELS['zodiac'].items():
            d['data']['zodiac'][z_id] = {
                'name': z_data['name'][lang],
                'element': z_data['element'][lang],
                'traits': z_data['traits'][lang],
            }

        # lifePath: dict of num -> {title, traits, summary}
        d['data']['lifePath'] = {}
        for lp_num, lp_data in DATA_MODELS['lifePath'].items():
            d['data']['lifePath'][lp_num] = {
                'title': lp_data['title'][lang],
                'traits': lp_data['traits'][lang],
                'summary': lp_data['summary'][lang],
            }

    # Verify key parity against en.json
    en_dict = dictionaries['en']

    def extract_keys(obj, prefix=''):
        keys = set()
        for k, v in obj.items():
            full_key = f'{prefix}.{k}' if prefix else k
            keys.add(full_key)
            if isinstance(v, dict):
                keys.update(extract_keys(v, full_key))
            elif isinstance(v, list) and v and isinstance(v[0], dict):
                for i, item in enumerate(v):
                    keys.update(extract_keys(item, f'{full_key}[{i}]'))
        return keys

    en_keys = extract_keys(en_dict)
    print(f"Total compiled keys in en.json: {len(en_keys)}")

    has_error = False
    for lang in ['pt', 'id', 'ar']:
        target_keys = extract_keys(dictionaries[lang])
        missing = en_keys - target_keys
        extra = target_keys - en_keys
        if missing:
            print(f"ERROR: [{lang.upper()}] missing {len(missing)} keys: {list(missing)[:5]}...")
            has_error = True
        else:
            print(f"OK: [{lang.upper()}] has 100% key parity with en ({len(target_keys)} keys).")

    if has_error:
        print("Compilation aborted due to key disparity.")
        sys.exit(1)

    # Save formatted JSON files
    for lang in LANGS:
        filepath = f'src/i18n/ui/{lang}.json'
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(dictionaries[lang], f, ensure_ascii=False, indent=2)
            f.write('\n')
        print(f"Wrote {filepath}")

    print("All dictionaries compiled successfully!")

if __name__ == '__main__':
    compile_all()
