import numpy as np
import io

DISPLAY_NAMES = ["Blight", "Common Rust", "Gray Leaf Spot", "Soybean Caterpillar", "Diabrotica speciosa"]
items = ["blight", "commonrust", "grayleafspot", "soybeancaterpillar", "diabroticaspeciosa"]

# Gets description to be displayed
def get_description(prop) :
    if prop == "healthy" :
        return ["Healthy", "No problems detected"]
    locate = 'background/' + prop + ".txt" # ADD source/ to this line
    with open(locate, 'r') as file:
        description = file.read()
    display_item = DISPLAY_NAMES[items.index(prop)]
    package = str([display_item, description])
    return package

print(get_description("grayleafspot"))

