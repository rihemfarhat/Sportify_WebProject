from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from pymongo import MongoClient
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException
import time

# 📌 Connexion à MongoDB
client = MongoClient("mongodb://localhost:27017/")  # Connexion locale à MongoDB
db = client["authDB"]  # Base de données
collection = db["products"]  # Collection des produits

# 📌 Configuration de Selenium
options = webdriver.ChromeOptions()
options.headless = True  # Mode sans interface graphique
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

# 📌 URLs des différentes catégories de produits
urls = [
    "https://www.tuttosport.com.tn/179-materiel-sport",  # Matériel sportif
    "https://www.tuttosport.com.tn/16-accessoire-de-sport?page=1",  # Accessoires page 1
    "https://www.tuttosport.com.tn/16-accessoire-de-sport?page=2",  # Accessoires page 2
    "https://www.tuttosport.com.tn/16-accessoire-de-sport?page=3",  # Accessoires page 3
    "https://www.tuttosport.com.tn/16-accessoire-de-sport?page=4",  # Accessoires page 4
    "https://www.tuttosport.com.tn/16-accessoire-de-sport?page=5",  # Accessoires page 5
    "https://www.tuttosport.com.tn/16-accessoire-de-sport?page=6",  # Accessoires page 6
    "https://www.antasports.tn/11-chaussures"  # Chaussures
]

# 📌 Fonction de scraping pour chaque URL
def scrape_products(url):
    driver.get(url)
    
    try:
        WebDriverWait(driver, 30).until(
            EC.presence_of_all_elements_located((By.CLASS_NAME, "product-miniature"))
        )
    except TimeoutException:
        print(f"❌ Timeout: Page load failed for {url}.")
        return

    products = driver.find_elements(By.CLASS_NAME, "product-miniature")

    for product in products:
        try:
            title = product.find_element(By.CLASS_NAME, "product-title").text.strip()
            price = product.find_element(By.CLASS_NAME, "price").text.strip()
            link_element = product.find_element(By.TAG_NAME, "a")
            product_link = link_element.get_attribute("href")
            img_tag = product.find_element(By.TAG_NAME, "img")
            img_url = img_tag.get_attribute("src") if img_tag else "No image available"
            
            # Store data
            product_data = {
                "title": title,
                "price": price,
                "link": product_link,
                "image": img_url,
                "page_url": url
            }

            # Insert data into MongoDB if not already present
            if collection.find_one({"link": product_link}):
                print(f"✅ Product already exists: {title}")
            else:
                collection.insert_one(product_data)
                print(f"✅ Product added: {title}")

        except (NoSuchElementException, TimeoutException) as e:
            print(f"❌ Error scraping product from {url}: {e}")

# 📌 Scraping des différentes URLs
for url in urls:
    scrape_products(url)

# Fermer le navigateur
driver.quit()

print("🎉 Scraping complete! Products have been added to MongoDB.")
