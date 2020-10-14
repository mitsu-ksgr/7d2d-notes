#!/bin/python3
# coding: utf-8

import json
import os
import sys
import xml.etree.ElementTree as ET


FILE_NAME_RECIPES_XML = "Config/recipes.xml"


#-----------------------------------------------------------------------------
#   Utility Classes
#-----------------------------------------------------------------------------
class Ingredient:
    def __init__(self, name, count, xml_recipe_dict):
        self.name = name
        self.count = count
        self.recipes = []
        for recipe in xml_recipe_dict.get(name, []):
            self.recipes.append(Recipe(recipe, xml_recipe_dict))

    def to_dict(self):
        return {
            "name": self.name,
            "count": self.count,
            "recipes": [r.to_dict() for r in self.recipes],
        }


class Recipe:
    def __init__(self, xml_recipe, xml_recipe_dict):
        self.name = xml_recipe.name
        self.count = xml_recipe.count
        self.material_based = xml_recipe.material_based
        self.craft_time = xml_recipe.craft_time
        self.craft_area = xml_recipe.craft_area

        # Tags
        self.tags = xml_recipe.tags
        self.salvage_scrap = ("salvageScrap" in xml_recipe.tags)
        self.learnable = ("learnable" in xml_recipe.tags)

        # Ingredients.
        self.ingredients = [] # [{"name": "key", "count": "10"}, ...]
        for xml_ing in xml_recipe.ingredients:
            ing = Ingredient(xml_ing["name"], xml_ing["count"], xml_recipe_dict)
            self.ingredients.append(ing)

    def to_dict(self):
        return {
            "name": self.name,
            "count": self.count,
            "material_based": self.material_based,
            "craft_time": self.craft_time,
            "craft_area": self.craft_area,
            "tags": self.tags,
            "salvage_scrap": self.salvage_scrap,
            "learnable": self.learnable,
            "ingredients": [ing.to_dict() for ing in self.ingredients],
        }


class XMLRecipe:
    def __init__(self, id_, node):
        self.id = id_ # for internal usage.
        self.name = "" # Note: name is not a unique value in xml.
        self.count = 1
        self.material_based = False
        self.craft_time = 0
        self.craft_area = None # workbench, forge, cementMixer, chemistryStation
        self.tags = []
        self.ingredients = [] # [{"name": "key", "count": "10"}, ...]
        # TODO: support CraftingIngredientCount
        self.parse(node)

    def parse(self, node):
        self.name = node.attrib["name"]
        self.count = node.attrib["count"]
        self.craft_time = node.attrib.get("craft_time", 0)
        self.craft_area = node.attrib.get("craft_area", None)
        self.material_based = node.attrib.get("material_based", False)

        # Parse tags
        tags = node.attrib.get("tags", "")
        self.tags = [tag.strip() for tag in tags.split(",")]

        # Parse ingredients
        for ing in node.iter("ingredient"):
            self.ingredients.append({
                "name": ing.attrib["name"],
                "count": ing.attrib["count"]
            })


class RecipeJsonEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Recipe):
            return obj.to_dict()
        if isinstance(obj, Ingredient):
            return obj.to_dict()
        return json.JSONEncoder.default(self, obj)


#-----------------------------------------------------------------------------
#   Entrypoint
#-----------------------------------------------------------------------------
def dump_recipe(r, i=""):
    print(f"{i}- Recipe: {r.name}")
    print(f"{i}\t- Count               : {r.count}")
    print(f"{i}\t- Material Based      : {r.material_based}")
    print(f"{i}\t- Craft Time          : {r.craft_time}")
    print(f"{i}\t- Craft Area          : {r.craft_area}")
    print(f"{i}\t- SalvageScrap Flag   : {r.salvage_scrap}")
    print(f"{i}\t- Learnable Flag      : {r.learnable}")
    print(f"{i}\t- Tags")
    for tag in r.tags:
        print(f"{i}\t\t- {tag}")
    print(f"{i}\t- Ingredients")
    for ing in r.ingredients:
        print(f"{i}\t\t- {ing.name} ({ing.count})")
        for ing_r in ing.recipes:
            dump_recipe(ing_r, f"{i}\t\t\t")

def load_recipes(data_dir_path: str):
    path_recipes_xml = f"{data_dir_path}/{FILE_NAME_RECIPES_XML}"
    try:
        xml_recipe_tree = ET.parse(path_recipes_xml)
    except FileNotFoundError as e:
        print(e)
        sys.exit(1)

    # Load recipes.xml
    xml_recipe_dict = {}
    root = xml_recipe_tree.getroot()
    id_ = 1
    for child in root:
        xml_recipe = XMLRecipe(id_, child)
        xml_recipe_dict.setdefault(xml_recipe.name, [])
        xml_recipe_dict[xml_recipe.name].append(xml_recipe)
        id_ += 1

    recipes = {}
    for key, xml_recipes in xml_recipe_dict.items():
        recipes.setdefault(key, [])
        for xml_recipe in xml_recipes:
            recipes[key].append(Recipe(xml_recipe, xml_recipe_dict))

    return recipes


def entrypoint(data_dir_path, out_dir_path, expand_flag = False):
    recipes = load_recipes(data_dir_path)

    # make output dir.
    if not os.path.isdir(out_dir_path):
        os.mkdir(out_dir_path)

    # generate json.
    indent = 4 if expand_flag else None
    for key, rlist in recipes.items():
        with open(f"{out_dir_path}/{key}.json", mode="w") as f:
            print(
                json.dumps(rlist,
                    cls=RecipeJsonEncoder,
                    indent=indent,
                    ensure_ascii=False),
                file=f)


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Generate 7daystodie recipe json.")
    parser.add_argument("data_dir_path", type=str,
        help="Path to 7daystodie/Data directory.")
    parser.add_argument("-o", "--output", type=str, default="out",
        metavar="OUTPUT_DIR_PATH",
        help="Output dir path. if not specified, output to 'out' dir.")
    parser.add_argument('-e', '--expand', action='store_true', default=False,
        help='Outputs uncompressed json. by defaults, outputs is minified.')
    args = parser.parse_args()

    data_dir_path = args.data_dir_path
    if data_dir_path.endswith('/'):
        data_dir_path = data_dir_path[:-1]

    entrypoint(data_dir_path, args.output, args.expand)

