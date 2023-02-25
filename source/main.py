# from Utils import *
# from ml_Utils import *
from investigator import *

# create_model("corn")
# create_model("soybean")

# print(predict("images/corn_blight_test.jpeg", "corn"))
# print(predict("images/definetelyNOTcommon_rust.jpeg", "corn"))
# print(predict("images/healthy_test.jpeg", "corn"))

dict = {"crop": "corn",
        "disease/pest": "common_rust"
        }
output_pubag_research(dict)