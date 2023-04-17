const express = require('express');

// Constants
const PORT = 3000;

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Puppeteer is up and running');
});

app.listen(PORT, () => {

});



function runPuppeteer() {
  return new Promise(resolve => {
  setTimeout(() => {
try {
  const puppeteer = require('puppeteer');
  (async () => {
      const randomNumber = Math.floor(Math.random() * 900) + 100;
      console.log('Starting puppeteer script...   ID:', randomNumber);
      const browser = await puppeteer.launch({
          headless: false,
          args: [
      '--proxy-server=socks5://localhost:9050', // Tor proxy
      '--no-sandbox',
      '--disable-setuid-sandbox',
      `--disable-extensions-except=/usr/src/app/extension`,
      `--load-extension=/usr/src/app/extension`
          ],
          });
          
          try {
              const page = await browser.newPage();
              await page.goto('https://freebitco.in');
              await page.waitForTimeout(10000);


            



              async function captchaResponse() {
                  var iframe = await page.$('iframe[tabindex="0"]');
                  if (iframe !== null) {
                    var response = await iframe.evaluate(el => el.getAttribute('data-hcaptcha-response'));
                    if (response !== "") {
                      console.log('Sign up captcha successfully bypassed!   ID:', randomNumber);
                      await page.evaluate(() => {
                      document.querySelector('.pushpad_deny_button').click();
                      })
                     setTimeout(() => {
                      signUp();
                     }, 2000);
                  } else {
                      setTimeout(captchaResponse, 1000);
                  }
                  }
              }


              async function signUp() {
                  function generateRandomString(length) {
                      let result = '';
                      const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
                      const charactersLength = characters.length;
                      for (let i = 0; i < length; i++) {
                        result += characters.charAt(Math.floor(Math.random() * charactersLength));
                      }
                      return result;
                  }

                  const randomString = generateRandomString(15);
                  await page.type('#signup_form_email', `${randomString}@gmail.com`);
                  await page.type('#signup_form_password', `${randomString}@$`);
                  await page.type('#referrer_in_form', '51234733')          
                  await page.click('#signup_button');

                  await page.waitForSelector('#free_play_form_button');
                  console.log('Successfully logged into account!   ID:', randomNumber);

                  setTimeout(() => {
                    captchaResponseR();
                  }, 10000);
              }


              async function captchaResponseR() {
                  var iframe = await page.$('iframe[tabindex="0"]');
                  if (iframe !== null) {
                    var response = await iframe.evaluate(el => el.getAttribute('data-hcaptcha-response'));
                    if (response !== "") {
                      console.log('Free roll captcha successfully bypassed!   ID:', randomNumber);
                      await page.evaluate(() => {
                        document.querySelector('.pushpad_deny_button').click();
                        })
                      setTimeout(() => {
                       roll();
                      }, 2000);
                    } else {
                      setTimeout(captchaResponseR, 1000);
                  }
                  }
              }                

              
              async function roll() {

              await page.evaluate(() => {
                var input = document.getElementById('next_client_seed');
                input.value = '2';
                })
                  await page.click('#free_play_form_button');
                  await page.waitForTimeout(5000);
                  await page.waitForSelector('#free_play_result');
                  const elementInnerText = await page.$eval('#free_play_result', el => el.innerText);
                  console.log(elementInnerText,'   ID:', randomNumber);
                  await browser.close();
              }

             captchaResponse();

          } catch (e) {
            await browser.close();
          } finally {
           // await browser.close();
          }
      })();
      
} catch (e) {
  console.log('An error occured while operating on pupperteer');
}



      resolve();
    }, 15000);
  });
}

setTimeout(runPuppeteer, 35000);
