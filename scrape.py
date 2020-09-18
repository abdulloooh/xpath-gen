from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common import exceptions
from selenium.webdriver.firefox.options import Options
import time
class scrape():
    def __init__(self):
        #st.createProfile('Scrape','')
        self.driver=webdriver.Chrome(executable_path = "./chromedriver")

        #self.post=config.get('api','site')+'update'
        #options.headless = True
        #elf.driver = webdriver.Chrome(executable_path=driver_path) #uploads the driver
        '''self.driver.set_network_conditions(
    offline=False,
    latency=3000,  
    download_throughput=500 * 1024,  
    upload_throughput=500 * 1024)'''
        self.id=1
        self.xpath=''
        self.data=[]
        self.driver.get("https://go.trackitlikeitshot.pl/click?offer_id=1132&affiliate_id=")
        try:
            self.scrape()
        except Exception as e:
            #st.deleteProfile()
            print(e)
            
    '''def isOn(self,driver):
        while True:
            page_state = driver.execute_script('return document.readyState;')
            if page_state == 'complete':
                requests.post("http://127.0.0.1:5000/scriptworking",data={'result':'Scraping ON'})
            else:
                requests.post("http://127.0.0.1:5000/scriptworking",data={'result':'Scraping Off'})
            time.sleep(0.1)'''

    def scrape(self): #Returns html
        #Process(target=self.isOn,args=(self.driver,)).start()
        while True:
            info=''
            #requests.post("http://127.0.0.1:5000/scriptworking",data={'result':'Scraping ON'})
            a=self.driver.execute_script(open("./script.js").read())
            print('Script Working')
            try:
                info=self.driver.execute_script("return localStorage['sero']")
            except Exception as e:
                self.logging(e)
            if info:
                xpat=info.split(',')[0]
                url=info.split(',')[1]
                if xpat!= None and xpat!=self.xpath:
                    #requests.post("http://127.0.0.1:5000/scriptworking",data={'result':'Scraping Off'})
                    print(info)
                    self.save_data(url,xpat)
                    xpat=''
                    print('Saved')
            time.sleep(0.5)
    
    def save_data(self,url,xpat):
        print(self.id)
        data={'id':self.id,'url': url, 'xpat': xpat, 'prob': 0,'isGoUrl':0}
        self.id+=1
        print(data)
        self.data.append(data)
        #requests.post("http://127.0.0.1:5000/update",data=data)
        self.xpath=xpat
        self.scrape()

    def main(self):
        self.driver.get('https://www.whoer.net')
        self.scrape()
scrape()
