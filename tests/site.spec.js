import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const ids = ['get-fed', 'snacks', 'main-course', 'just-desserts'];
for (const width of [320,390,768,1440]) {
 test(`four panels and no horizontal overflow at ${width}px`, async ({page}) => {
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.setViewportSize({width,height:900});await page.goto('/');
  await expect(page.getByRole('tab')).toHaveCount(4);
  for (const id of ids) {
   await page.locator(`#tab-${id}`).click();
   await expect(page.getByRole('tabpanel')).toHaveCount(1);
   await expect(page.locator(`#${id}`)).toBeVisible();
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
  expect(errors).toEqual([]);
 });
}
test('keyboard, deep links, history, CTA and missing asset handling',async({page})=>{
 await page.goto('/');await page.locator('#tab-get-fed').focus();
 await page.keyboard.press('ArrowLeft');await expect(page.locator('#tab-just-desserts')).toBeFocused();
 await page.keyboard.press('Home');await expect(page.locator('#tab-get-fed')).toBeFocused();
 await page.keyboard.press('End');await expect(page.locator('#just-desserts')).toBeVisible();
 await page.goto('/#get-fed');await page.getByRole('link',{name:'GET THE GOOD STUFF'}).click();await expect(page.locator('#snacks')).toBeVisible();
 await page.goBack();await expect(page.locator('#get-fed')).toBeVisible();
 await expect(page.getByRole('button',{name:'FEED ME!'})).toBeDisabled();
 await page.goto('/#main-course');await expect(page.locator('#portrait-pending')).toBeVisible();await expect(page.locator('#liza-portrait')).toBeHidden();
 const allowed = ['https://www.instagram.com/fck.dinner','https://www.tiktok.com/@fck.dinner','https://www.linkedin.com/in/liza-schatt','mailto:liza@fuckyescreative.com'];
 const hrefs=await page.locator('a:not([href^="#"])').evaluateAll(els=>els.map(el=>el.getAttribute('href')));
 expect(hrefs.every(h=>allowed.includes(h))).toBe(true);
 await page.goto('/#just-desserts');await expect(page.locator('a[href="mailto:liza@fuckyescreative.com"]:visible')).toHaveCount(3);
});
test('accessibility semantics across panels, reduced motion, local assets',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 const failed=[];page.on('response',r=>{if(r.url().startsWith('http://127.0.0.1')&&r.status()>=400)failed.push(r.url())});
 for (const id of ids){
  await page.goto(`/#${id}`);
  // Axe does not account for the black text stroke on brand-red display headings.
  const results=await new AxeBuilder({page}).disableRules(['color-contrast']).analyze();
  expect(results.violations).toEqual([]);
 }
 await page.evaluate(()=>document.fonts.ready);expect(failed).toEqual([]);
 await page.screenshot({path:'test-results/desktop-desserts.png',fullPage:true});
 await page.setViewportSize({width:390,height:844});await page.goto('/');await page.screenshot({path:'test-results/mobile-home.png',fullPage:true});
});
