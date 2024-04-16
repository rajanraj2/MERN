import tensorflow as tf
import matplotlib.pyplot as plt
import cv2
import os
import numpy as np
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.preprocessing import image
from tensorflow.keras.optimizers import RMSprop


from keras.models import load_model
loaded_model = load_model('FFmy_model.h5')

import os
import numpy as np
from tensorflow.keras.preprocessing import image
import matplotlib.pyplot as plt

img_path = r"jeans.jpg"

img = image.load_img(img_path, target_size=(200, 200))
plt.imshow(img)
# plt.show()
X = image.img_to_array(img)
X = np.expand_dims(X, axis=0)
result = loaded_model.predict(X)
prediction = np.argmax(result) 
    
if prediction == 0:
    print("sho")
elif prediction == 1:
    print('t-shirt')
else:
    print('trouser')





# import tensorflow as tf
# import matplotlib.pyplot as plt
# import cv2
# import os
# import numpy as np
# from tensorflow.keras.preprocessing.image import ImageDataGenerator
# from tensorflow.keras.preprocessing import image
# from tensorflow.keras.optimizers import RMSprop

# from keras.models import load_model

# # Load the Keras model
# loaded_model = load_model('FFmy_model.h5')

# # Define a function to predict the class of an image
# def predict_class(image_path):
#     img = image.load_img(image_path, target_size=(200, 200))
#     X = image.img_to_array(img)
#     X = np.expand_dims(X, axis=0)
#     result = loaded_model.predict(X)
#     prediction = np.argmax(result)
#     if prediction == 0:
#         return "shoes"
#     elif prediction == 1:
#         return "t-shirt"
#     else:
#         return "trouser"

# if __name__ == "__main__":
#     img_path = r"jeans.jpg"
#     prediction = predict_class(img_path)
#     # Explicitly encode the prediction string to 'utf-8'
#     print(prediction.encode('utf-8'))
