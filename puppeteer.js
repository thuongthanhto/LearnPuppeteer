const puppeteer = require("puppeteer");
const fs = require("fs");

puppeteer.launch({ headless: false }).then(async browser => {
  const page = await browser.newPage();
  await page.goto("https://portal.qlmortgageservices.com/sign-in");
  await page.waitForSelector("#signinname");
  await page.type("#signinname", "dp.ucd123@outlook.com");
  await page.type("#password", "Thuong@2018");
  await page.click("#submit");
  await page.waitForSelector("#sign-in-welcome");
  await page.goto(
    "https://portal.qlmortgageservices.com/guru/searchresults?q=DTI&site=QLMS_Guru_All",
    { timeout: 0 }
  );
  await page.waitForSelector("#logo", {timeout: 0});
  await page.waitFor(5*1000)
  await page.screenshot({path: 'screenshot.png'});
  const html = await page.mainFrame().content();
  fs.writeFile("writer.html", html, "utf8", function(err) {
    //Kiểm tra nếu có lỗi thì xuất ra lỗi
    if (err) throw err;
    //nếu không thì hiển thị nội dung ghi file thành công
    else console.log("Ghi file thanh cong!");
  });
  await browser.close();
});
