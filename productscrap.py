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

# 📌 URL cible
url = "https://www.antasports.tn/11-chaussures"

# Ouvrir la page avec Selenium
driver.get(url)

# Attendre le chargement des produits
try:
    WebDriverWait(driver, 30).until(
        EC.presence_of_all_elements_located((By.CLASS_NAME, "product-miniature"))
    )
except TimeoutException:
    print("❌ Temps d'attente dépassé. Impossible de charger la page.")
    driver.quit()
    exit()

# 📌 Sélectionner tous les produits
products = driver.find_elements(By.CLASS_NAME, "product-miniature")

# 📌 Itérer sur tous les produits
for product in products:
    try:
        # 📌 Récupérer le titre du produit
        title = product.find_element(By.CLASS_NAME, "product-title").text.strip()
        
        # 📌 Récupérer le prix du produit
        price = product.find_element(By.CLASS_NAME, "price").text.strip()
        
        # 📌 Récupérer l'URL du produit
        link_element = product.find_element(By.TAG_NAME, "a")
        product_link = link_element.get_attribute("href")
        
        # 📌 Récupérer l'image du produit
        img_tag = product.find_element(By.TAG_NAME, "img")
        img_url = img_tag.get_attribute("src") if img_tag else "Image non disponible"
        
        # 📌 Stocker les données dans MongoDB
        product_data = {
            "title": title,
            "price": price,
            "link": product_link,
            "image": img_url,
            "page_url": url
        }

        # Vérifier si le produit est déjà dans la base de données pour éviter les doublons
        if collection.find_one({"link": product_link}):
            print(f"✅ Produit déjà présent: {title}")
        else:
            collection.insert_one(product_data)
            print(f"✅ Produit ajouté: {title}")

    except (NoSuchElementException, TimeoutException) as e:
        print(f"❌ Erreur lors du scraping d'un produit : {e}")

# Fermer le navigateur
driver.quit()

print("🎉 Scraping terminé ! Les produits ont été ajoutés à MongoDB.")
