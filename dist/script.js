/* ===========================
   Torque Rush Garage — script
   Cart-only checkout (Smart Buttons; pays whole cart in one order)
=========================== */

/* ---------- PayPal SDK Ready (for Smart Buttons) ---------- */
const paypalReady = new Promise((resolve) => {
  if (window.paypal && window.paypal.Buttons) return resolve();
  const iv = setInterval(() => {
    if (window.paypal && window.paypal.Buttons) {
      clearInterval(iv);
      resolve();
    }
  }, 100);
  setTimeout(() => clearInterval(iv), 10000);
});

/* ---------- Render ONE checkout button for WHOLE CART ---------- */
async function renderPayPalButton() {
  const btnContainer = document.getElementById("paypal-button-container");
  const msgEl = document.getElementById("result-message");
  if (!btnContainer) return;

  btnContainer.innerHTML = "";
  if (msgEl) msgEl.textContent = "";

  // If cart is empty, nothing to render
  if (!Array.isArray(cart) || cart.length === 0) return;

  await paypalReady;
  if (!window.paypal || !window.paypal.Buttons) {
    btnContainer.innerHTML = "<div style='color:red;'>PayPal SDK not ready.</div>";
    return;
  }

  // Compute total for the entire cart
  const total = cart.reduce((sum, x) => {
    const p = Number(x?.price);
    return sum + (Number.isFinite(p) ? p : 0);
  }, 0);

  try {
    paypal.Buttons({
      style: { layout: "vertical", height: 45 },

      // Create an order for the WHOLE CART
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              description: "Torque Rush Garage — Cart",
              amount: {
                currency_code: "USD",
                value: total.toFixed(2),
              },
            },
          ],
        });
      },

      // Capture the payment
      onApprove: async (data, actions) => {
        try {
          const details = await actions.order.capture();
          if (msgEl) msgEl.textContent = "Payment complete. Order " + details.id;
          // Clear the cart and re-render
          cart = [];
          renderCart();
        } catch (e) {
          if (msgEl) msgEl.textContent = "Capture failed: " + (e?.message || e);
        }
      },

      // Show PayPal errors in the modal
      onError: (err) => {
        if (msgEl) msgEl.textContent = "PayPal error: " + (err?.message || err);
      },
    }).render("#paypal-button-container");
  } catch (e) {
    btnContainer.innerHTML = "<div style='color:red;'>Unable to render PayPal button.</div>";
    if (msgEl) msgEl.textContent = e?.message || String(e);
  }
}

/* -------------------------
   YOUR PRODUCTS & TIERS
------------------------- */
/* (Keeping your mappings/features in place so UI stays the same.
   Hosted Button IDs are no longer used by checkout; we pay the whole cart.) */

/* NASCAR 25 hosted IDs (kept, but not used by Smart Buttons) */
const HOSTED_NASCAR25 = {
  "CUP SERIES": { single:"S8BUTCHGK7B3S", "5-pack":"URUPKF6T4J58Q", "10-pack":"BNPC5WU3HWNDC", full:"2NQCDC6HUMB9A" },
  "XFINITY SERIES": { single:"SUXU4HFAYPRWS", "5-pack":"NJFZDM7HFAQAG", "10-pack":"V6TVD23QL4A92", full:"CUPKXGK4R9WZ4" },
  "TRUCK SERIES": { single:"XXTYBE4ZERYPQ", "5-pack":"ZTXVVBHQ7AWEJ", "10-pack":"ALAZG66PSLTP4", full:"V2QYFUA4MLM7S" },
  "ARCA SERIES": { single:"4FGC9DF9WVJMC", "5-pack":"HZ9D33868T5T4", "10-pack":"CK5DLLNP266SJ", full:"KT3UJTTW77VGS" },
  ALL: { full:"V6SK8DHPEPLJN" }
};

/* Bundles 1–3 (kept for UI + price) */
const bundleTiers = [
  { id: "bundle1", name: "1 Car / 1 Track", type: "bundle", base: 22.99,
    buttons: { basic:"2KGP2JW5PKKNN", pro:"DHKV5RKHKQB32", elite:"LUE2Y5WX7EMQ6" },
    features: ["Car tuning package","Performance boost","Optimized setups"] },
  { id: "bundle2", name: "1 Car / 2 Tracks or 2 Cars / 1 Track", type: "bundle", base: 25.99,
    buttons: { basic:"5S4HW9MCNKYPL", pro:"FN5W773LP2344", elite:"DJDHMVBSSEASG" },
    features: ["Advanced handling tweaks","Racing optimization"] },
  { id: "bundle3", name: "1 Car / 3 Tracks or 3 Cars / 1 Track", type: "bundle", base: 32.99,
    buttons: { basic:"WND9YDDEG96LU", pro:"TH4L6EPNC9E78", elite:"XHFKZ5PDA527L" },
    features: ["Optimized car & track combo","Tailored tune for events","Fast delivery","--1 FREE TUNE FOR 1 MORE CAR UPON PURCHASE--"] }
];

/* Flat tiers (kept for UI + price) */
const tierTiers = [
  { id:"basic", name:"Basic", type:"flat", price:5.99, code:"ZWD86SFTG8LCW",
    features:["Single car setup","Performance adjustments","Up to 3 Adjustments Per Car","Tires","Camber","Springs","Suspension","Brakes"] },
  { id:"pro", name:"Pro", type:"flat", price:9.99, code:"MK7RA8J87U7VY",
    features:["All Basic features","Gearing, suspension, tires & aerodynamics","Up to 6 Adjustments Per Car","Tires","Camber","Anti-Roll Bars","Aero","Brakes","Differentials"] },
  { id:"elite", name:"Elite", type:"flat", price:16.99, code:"N6ZFC5VKSYTFA",
    features:["Full race-ready custom setup","Peak performance tuning","Up to 10 Adjustments Per Car","Tires","Camber","Toe and Caster","Springs","Anti-Roll Bars","Dampers","Suspension Geometry","Aero","Brakes","Differentials"] }
];

/* Coaching */
const coachingTier = {
  id:"coach", name:"Custom Coaching", type:"coach", price:59.99, code:"EEFRHEEQ8A4SA",
  features:[
    "*Tell us what you need…*",
    "<span class='text-red'>(— Car & Build):</span><span class='text-ice'> Make, model, year, engine & drivetrain mods</span>",
    "<span class='text-red'>(— Tracklist):</span><span class='text-ice'> Which circuits or types of tracks you race most</span>",
    "<span class='text-red'>(— Driving Style):</span><span class='text-ice'> e.g. aggressive on entry, smooth exits, late braking</span>",
    "<span class='text-red'>(— Performance Goals):</span><span class='text-ice'> Lap-time targets, corner-speed, top-end power</span>",
    "<span class='text-red'>(— Areas to Improve):</span><span class='text-ice'> Understeer, throttle response, shifting, etc.</span>",
    "<span class='text-red'>(— Other Games/Platforms):</span><span class='text-ice'> If you race in other titles or on sim rigs.</span>",
    "*Weekly-7 days coaching subscription* (NOT AUTO BILLED)"
  ]
};

/* -------------------------
   GAME DATA (your original)
------------------------- */
const GAME_DATA = [
  { 
    name: "Forza Horizon 5",
    vehicles: [
      "1926 Bugatti Type 35 C","1929 Mercedes-Benz SSK","1930 Bentley 8 Litre","1930 Bentley Blower 4-1/2 Litre Supercharged","1939 Auto Union Type D","1939 Maserati 8CTF","1939 Mercedes-Benz W154","1954 Mercedes-Benz 300 SL Coupe","1955 Mercedes-Benz 300 SLR","1957 BMW Isetta 300 Export","1958 Aston Martin DBR1","1958 Austin-Healey Sprite MkI","1962 Lincoln Continental","1964 Aston Martin DB5","1965 Alfa Romeo Giulia Sprint GTA Stradale","1965 Alfa Romeo Giulia TZ2","1965 MINI Cooper S","1965 MINI Cooper S Forza Edition","1967 Lamborghini Miura P400","1967 Mercedes-Benz 280 SL","1968 Abarth 595 esseesse","1968 Alfa Romeo 33 Stradale","1968 Lancia Fulvia Coupe Rallye 1.6 HF","1969 Lola #6 Penske Sunoco T70 MkIIIB","1970 AMC Rebel The Machine","1970 Buick GSX","1970 Mercury Cyclone Spoiler","1971 AMC Javelin AMX","1971 Lotus Elan Sprint","1971 Meyers Manx","1971 Meyers Manx Forza Edition","1972 Land Rover Series III","1973 Alpine A110 1600s","1973 AMC Gremlin X","1973 BMW 2002 Turbo","1973 Lamborghini Espada 400 GT","1973 Land Rover Range Rover","1974 Lancia Stratos HF Stradale","1979 Chevrolet Camaro Z28","1980 Abarth Fiat 131","1980 Lotus Esprit Turbo","1981 BMW M1","1983 Audi Sport quattro","1986 Audi #2 Audi Sport quattro S1","1986 BMW M635CSi","1986 Lamborghini LM 002","1986 Lancia Delta S4","1986 MG Metro 6R4","1987 Buick Regal GNX","1987 Mercedes-Benz AMG Hammer Coupe","1987 Mercedes-Benz AMG Hammer Wagon","1988 BMW M5","1988 Chevrolet Monte Carlo Super Sport","1988 Lamborghini Countach LP5000 QV","1990 Aston Martin Lagonda","1990 Mazda Savanna RX-7","1990 Mercedes-Benz 190E 2.5-16 Evolution II","1991 Bentley Turbo R","1991 BMW M3","1991 BMW X5 M","1992 Alfa Romeo 155 Q4","1992 Bugatti EB110 Super Sport","1992 Lancia Delta HF Integrale EVO","1992 Mazda 323 GT-R","1992 Mercedes-Benz 500 E","1993 Autozam AZ-1","1993 McLaren F1","1994 Mazda MX-5 Miata","1995 Audi Avant RS 2","1995 BMW 850CSi","1995 BMW M5","1995 Chevrolet Corvette ZR-1","1995 Mitsubishi Lancer Evolution III GSR","1996 Chevrolet Impala Super Sport","1997 BMW M3","1997 Lamborghini Diablo SV","1997 Lexus SC300","1997 Lotus Elise GT1","1997 McLaren F1 GT","1997 Mazda RX-7","1997 Mitsubishi GTO","1997 Mitsubishi Montero Evolution","1998 Mercedes-Benz AMG CLK GTR","1998 Mercedes-Benz AMG CLK GTR Forza Edition","1998 Mitsubishi FTO GP Version R","1999 Lamborghini Diablo GTR","1999 Lotus Elise Series 1 Sport 190","1999 Mitsubishi Lancer Evolution VI GSR","2000 Lotus 340R","2001 Acura Integra Type-R","2001 Audi RS 4 Avant","2002 Acura RSX Type-S","2002 BMW M3-GTR","2002 BMW Z3 M Coupe","2002 Chevrolet Corvette Z06","2002 Lotus Esprit V8","2002 Mazda RX-7 Spirit R Type-A","2003 Audi RS 6","2003 BMW M5","2004 Mitsubishi Lancer Evolution VIII MR","2005 BMW M3","2005 Mazda Mazdaspeed MX-5","2005 MG XPower SV-R","2005 Mitsubishi #1 Sierra Enterprises Lancer Evolution Time Attack","2005 Nissan 350Z Nismo","2006 Audi S4","2006 BMW Z4 M Roadster","2006 Chevrolet Corvette Z06","2007 BMW 335i","2007 Ferrari F430 Scuderia","2007 Porsche 911 Turbo","2008 Audi RS4","2008 BMW M3","2008 Chevrolet Corvette ZR1","2008 Dodge Viper SRT10 ACR","2008 Mitsubishi Lancer Evolution X GSR","2009 Ford Focus RS","2009 Nissan GT-R","2009 Porsche 911 Carrera S","2010 Aston Martin V12 Vantage","2010 Audi R8 5.2 FSI Quattro","2010 BMW M5","2010 Chevrolet Camaro SS","2010 Dodge Challenger SRT8","2010 Ford Shelby GT500","2011 Lamborghini Gallardo LP 570-4 Superleggera","2011 Porsche 911 GT3 RS 4.0","2012 Bugatti Veyron 16.4 Super Sport","2012 Chevrolet Corvette ZR1","2012 Ferrari 458 Italia","2013 McLaren P1","2013 Nissan GT-R Black Edition","2013 Pagani Huayra","2014 Chevrolet Camaro Z28","2014 Jaguar F-Type R","2015 Ford Mustang GT350","2015 Mercedes-Benz AMG GT","2015 Porsche 911 GT3 RS","2016 Audi R8 V10 Plus","2016 BMW M4 GTS","2016 Chevrolet Camaro ZL1","2016 Ford Focus RS","2016 Nissan GT-R Nismo","2016 Porsche 911 Turbo S","2017 Alfa Romeo Giulia Quadrifoglio","2017 Audi RS3","2017 Bugatti Chiron","2017 Chevrolet Corvette Grand Sport","2017 Dodge Viper ACR","2017 Ford GT","2017 Porsche 911 GT2 RS","2018 Aston Martin Vantage","2018 BMW M5","2018 Ferrari 488 Pista","2018 Ford Mustang GT","2018 Nissan GT-R","2019 Audi RS5","2019 BMW Z4 M40i","2019 Chevrolet Corvette ZR1","2019 Ferrari F8 Tributo","2019 Lamborghini Aventador SVJ","2019 McLaren 720S","2020 Aston Martin DBS Superleggera","2020 Audi RS7","2020 BMW M8 Competition","2020 Bugatti Chiron Pur Sport","2020 Chevrolet Corvette Stingray","2020 Ferrari 812 GTS","2020 Ford Mustang Shelby GT500","2020 Lamborghini Huracán EVO","2020 Nissan GT-R Nismo","2021 Audi RS5 Coupe","2021 BMW M4","2021 Ferrari SF90 Stradale","2021 Ford Mustang Mach 1","2021 Lamborghini Huracán STO","2021 McLaren Artura","2021 Porsche 911 Turbo S","2021 Toyota Supra","2022 Chevrolet Camaro ZL1","2022 Ford Bronco Raptor","2022 Hyundai N Vision 74","2022 Lamborghini Countach LPI 800-4","2022 Porsche 911 GT3 RS","2023 Aston Martin Valhalla","2023 BMW M2","2023 Chevrolet Corvette Z06","2023 Dodge Charger SRT Hellcat","2023 Ferrari 296 GTB","2023 Ford F-150 Raptor R","2023 Lamborghini Revuelto","2023 McLaren Solus GT","2023 Nissan Z","2023 Pagani Utopia","2023 Porsche 911 Dakar","2023 Toyota GR86","2024 Alfa Romeo Tonale","2024 Audi RS Q8","2024 BMW i4 M50","2024 Cadillac Lyriq","2024 Chevrolet Silverado EV","2024 Dodge Ram 1500 REV","2024 Ferrari Purosangue","2024 Ford Mustang Mach-E GT","2024 Genesis GV80","2024 Hyundai Ioniq 6","2024 Infiniti QX80","2024 Jaguar F-Type","2024 Lamborghini Huracán Tecnica","2024 Lexus LX 600","2024 Lucid Air Dream Edition","2024 Maserati Grecale Trofeo","2024 Mazda CX-90","2024 Mercedes-Benz EQS","2024 Nissan Ariya","2024 Porsche Taycan Turbo S","2024 Rivian R1T","2024 Rolls-Royce Spectre","2024 Subaru WRX STI","2024 Tesla Model S Plaid","2024 Toyota Sequoia","2024 Volkswagen ID. Buzz","2024 Volvo XC90 Recharge"
    ],
    tracks: ["Drag","Roll Racing","Circuit","Sprint","Drift (Beta)","Rally (Beta)","Cruise"]
  },

  { name: "Forza Motorsports",
    vehicles: ["1926 Bugatti Type 35 C","1939 Auto Union Type D","1958 Aston Martin DBR1","1960 Aston Martin DB4 GT Zagato","1964 Aston Martin DB5","1964 Brabham BT8","1964 Chevron B16","1965 Alfa Romeo Giulia Sprint GTA Stradale","1965 Austin-Healey 3000 MkIII","1966 Chaparral #66 2E","1967 Aston Martin DBS","1967 Brabham BT24","1967 Chevrolet Corvette Stingray 427","1969 Chevrolet Nova Super Sport 396","1969 Chevrolet Camaro Jordan Luka 3 Motorsport Edition","1969 Chevrolet Camaro Super Sport Coupe","1969 Datsun 2000 Roadster","1970 AMC Rebel The Machine","1970 Buick GSX","1970 Chevrolet Corvette ZR-1","1970 Chevrolet Chevelle Super Sport 454","1970 Chevrolet Camaro Z28","1970 Datsun 510","1971 AMC Javelin AMX","1972 Chrysler VH Valiant Charger R/T E49","1973 BMW 2002 Turbo","1974 BRM #14 P201","1975 BMW #25 3.0 CSL","1976 BMW #1 3.0 CSL","1976 Chevrolet #76 Greenwood Corvette","1979 BMW #6 M1 Procar","1979 Datsun #33 280ZX Turbo","1981 BMW M1", "2024 Porsche #5 Porsche Penske Motorsport 963", "1981 Porsche #1 Porsche System Engineering 924 GTP Le Mans", "1984 Audi Sport quattro","1984 De Tomaso Pantera GT5","1985 Buick #6 Somerset Regal Trans-Am","1986 BMW M635 CSi","1987 Buick Regal GNX","1988 BMW M5","1988 Chevrolet Monte Carlo Super Sport","1988 Chevrolet #77 Beretta Trans Am","1989 Aston Martin #18 AMR1","1989 Audi #4 90 quattro IMSA GTO","1990 Alpine GTA Le Mans","1990 Chevrolet Camaro IROC-Z","1991 BMW M3","1992 Bugatti EB110 Super Sport","1995 Audi Avant RS 2","1995 BMW 850CSi","1995 Chevrolet Corvette ZR-1","1997 BMW M3","1998 Aston Martin V8 Vantage V600","1999 BMW #16 V12 LMR","1999 BMW #15 V12 LMR","2000 BMW 323ti Sport","2001 Acura Integra Type R","2001 Aston Martin V12 Vanquish","2001 Audi RS 4 Avant","2002 BMW M3-GTR","2002 BMW Z3 M Coupé","2002 Chevrolet Corvette Z06","2002 Chevrolet Camaro 35th Anniversary Super Sport","2003 Audi RS 6","2003 Bentley #7 Speed 8","2003 BMW M5","2004 Audi S4","2005 BMW M3","2006 Audi RS 4","2008 Aston Martin DBS","2008 BMW M3","2009 BMW M5","2009 Chevrolet Corvette ZR1","2010 Audi R8 5.2 FSI quattro","2010 BMW M3 GTS","2010 BMW M6 Coupé","2010 Chevrolet #55 Oreca FLM09","2011 Alfa Romeo Giulietta Quadrifoglio Verde","2011 Audi RS 3 Sportback","2011 BMW 1 Series M Coupé","2011 Bugatti Veyron Super Sport","2011 Citroën DS 3 Racing","2012 BMW M5","2013 Ariel Atom 500 V8","2013 Aston Martin V12 Vantage S","2013 Audi R8 V10 plus","2013 Audi RS 7 Sportback","2013 Audi RS 4 Avant","2013 BMW M6 Coupé","2013 Caterham Superlight R500", "2013 Shelby GT500", "2014 Alfa Romeo 4C","2014 Audi #2 R18 e-tron quattro","2014 BAC Mono","2014 Bentley #17 Continental GT3","2014 BMW M4 Coupé","2014 Cadillac CTS-V Sport Wagon","2014 Chevrolet #3 Corvette C7.R","2015 Aston Martin Vantage GT12","2015 Audi RS 6 Avant","2015 Audi S1","2015 BMW i8","2015 Cadillac #3 ATS-V.R","2015 Chevrolet #10 Daytona Prototype","2015 Chevrolet Corvette Z06","2016 Aston Martin Vulcan","2016 Audi #17 TT RS","2016 Audi R8 V10 plus","2016 BMW M4 GTS","2016 Cadillac CTS-V Sedan","2016 Cadillac ATS-V","2016 Chevrolet Camaro Super Sport","2017 Abarth 124 Spider","2017 Acura NSX","2017 Alfa Romeo Giulia Quadrifoglio","2017 Alpine A110","2017 Aston Martin Vulcan AMR Pro","2017 Aston Martin #7 V12 Vantage GT3","2017 Aston Martin Vanquish Zagato Coupe","2017 Bentley Continental Supersports","2017 BMW #24 M6 GTLM","2017 Chevrolet Camaro ZL1","2018 Acura #36 NSX GT3","2018 Apollo Intensa Emozione","2018 Aston Martin #97 AMR Vantage GTE","2018 Audi #44 R8 LMS GT3","2018 Audi #1 RS 3 LMS","2018 Audi TT RS","2018 Audi RS 5 Coupe","2018 Audi RS 4 Avant","2018 BMW #1 M8 GTE","2018 BMW M5","2018 Bugatti Chiron","2018 Cadillac #57 TA CTS-V","2018 Chevrolet #23 TA Corvette","2018 Chevrolet Camaro ZL1 1LE Forza Edition","2018 Chevrolet Camaro ZL1 1LE","2019 Aston Martin Valhalla Concept Car","2019 Aston Martin DBS Superleggera","2019 Aston Martin Vantage","2019 BMW Z4 Roadster","2019 Brabham BT62","2019 Bugatti Divo","2019 Chevrolet Corvette ZR1","2020 Acura #6 ARX-05 DPi","2020 Audi R8 V10 performance","2020 Audi TT RS Coupe","2020 Audi RS 3 Sedan","2020 Automobili Pininfarina Battista","2020 BMW M8 Competition Coupé","2020 BMW M2 Competition Coupé","2020 Chevrolet #3 C8.R","2020 Chevrolet Corvette Stingray Coupe Forza Edition","2020 Chevrolet Corvette Stingray Coupe","2021 Audi RS e-tron GT","2021 Audi RS 6 Avant","2021 Audi RS 7 Sportback","2021 BMW M3 Competition Sedan","2021 BMW M4 Competition Coupé","2021 Cadillac #31 DPi-V.R","2022 Acura NSX Type S","2022 Aston Martin Valkyrie AMR Pro","2022 Cadillac CT5-V Blackwing","2022 Cadillac CT4-V Blackwing","2023 Aston Martin Valkyrie","2023 BMW #25 M Hybrid V8","2023 BMW #96 M4 GT3","2023 BMW M2","2023 Cadillac #31 V-Series.R","2023 Cadillac #2 V-Series.R","2023 Cadillac #01 V-Series.R","2023 Chevrolet Corvette Z06","2023 Porsche 911 GT3 R", "2023 Porsche 911 Turbo S", "2024 Mustang Dark Horse", "2023 Ford #65 Ford Multimatic Motorsports Mustang GT3", "2024 #25 Mustang RTR", "2024 #88 Mustang RTR", "2024 #130 Mustang RTR", "2024 Chevrolet NASCAR Camaro ZL1","2024 Chevrolet Corvette E-Ray"
    ],
    tracks: ["Bathurst (Mount Panorama Circuit)","Brands Hatch GP","Brands Hatch Indy","Catalunya GP","Catalunya National","Catalunya National Alt","Circuit de Spa","Daytona 24hr Sports Car","Daytona Tri-Oval","Eaglerock Club-R","Eaglerock Oval","Grand Oak Club","Grand Oak National","Grand Oak National-R","Hakone Club","Hakone Club-R","Hakone Grand Prix","Hockenheimring Full","Hockenheimring National","Hockenheimring Short","Homestead Road","Homestead Speedway","Indianapolis Brickyard Oval","Indianapolis GP","Kyalami Grand Prix","Laguna Seca Full","Laguna Seca Short","Le Mans La Sarthe Full","Le Mans Old Mulsanne","Lime Rock Full","Lime Rock Full Alt","Lime Rock South","Maple Valley","Maple Valley Short","Maple Valley Short-R","Mid-Ohio","Mid-Ohio Short","Mugello Club","Mugello Full","Nurburgring Full","Nurburgring GP","Nurburgring Nordschleife","Nurburgring Sprint","Road America","Road America East","Road Atlanta","Road Atlanta Short","Sebring Full","Sebring Short","Silverstone GP","Silverstone International","Silverstone National","Sunset Peninsula Club","Sunset Peninsula Club-R","Sunset Peninsula Full","Sunset Peninsula Full-R","Sunset Peninsula Speedway","Suzuka East","Suzuka Full","VIR Full","VIR Grand East","VIR Grand West","VIR North","VIR South","Watkins Glen Full","Watkins Glen Short","Yas Marina Full","Yas Marina North","Yas Marina North Corkscrew","Yas Marina South"
    ] },

  { name: "Assetto Corsa",
    vehicles: ["Abarth 500 Assetto Corse","Abarth 500 EsseEsse","Abarth 500 EsseEsse Step 1","Abarth 595 SS","Abarth 595 SS Step 1","Abarth 595 SS Step 2","Alfa Romeo 33 Stradale","Alfa Romeo 4C","Alfa Romeo 155 Ti V6","Alfa Romeo GTA","Alfa Romeo Giulia Quadrifoglio","Alfa Romeo Giulietta QV","Alfa Romeo Giulietta QV Launch Edition 2014","Alfa Romeo Mito QV","Audi R8 LMS Ultra","Audi R18 e-tron Quattro","Audi R8 LMS 2016","Audi Sport Quattro","Audi Sport Quattro S1 E2","Audi Sport Quattro Step 1","Audi TT Cup","Audi TT RS VLN","BMW 1M Coupe","BMW 1M Coupe Stage 3","BMW M3 E30","BMW M3 E30 Drift","BMW M3 E30 Group A 92","BMW M3 E30 Group A","BMW M3 E30 Step 1","BMW M3 E92","BMW M3 E92 Step 1","BMW M3 E92 Drift","BMW M3 GT2","BMW M4 Coupe Akrapovic Edition","BMW M4 Coupe","BMW Z4 E89 35is","BMW Z4 E89 Drift","BMW Z4 E89 Step 1","BMW Z4 GT3","Chevrolet Corvette C7R","Ferrari 312T","Ferrari 458 GT2","Ferrari 458 Italia","Ferrari 458 Italia Stage 3","Ferrari 599XX Evo","Ferrari F40","Ferrari F40 Stage 3","Ferrari FXX K","Ferrari LaFerrari","Ferrari SF 15-T","Ferrari F138","Ferrari 488 GT3","Ferrari FXX K","Ferrari 488 GTB","Ford Escort RS 1600","Ford GT40","Ford Focus RS 1600","Ford GT40 MKI","KTM X-Bow R","Lamborghini Countach","Lamborghini Countach S1","Lamborghini Gallardo Superleggera Step 3","Lamborghini Huracan GT3","Lamborghini Huracan Performante","Lamborghini Huracan Super Trofeo","Lamborghini Miura","Lamborghini Sesto Elemento","Lotus 2-Eleven","Lotus 2-Eleven GT4","Lotus Elise SC","Lotus Elise SC Step 1","Lotus Elise SC Step 2","Lotus Evora GTC","Lotus Evora GTE","Lotus Evora GTE Carbon","Lotus Evora GX","Lotus Evora S","Lotus Evora S Stage 2","Lotus Exige 240R","Lotus Exige 240R Stage 3","Lotus Exige S","Lotus Exige S Roadster","Lotus Exige Scura","Lotus Exige V6 CUP","Lotus Exos T125","Lotus Exos T125 Stage 1","Lotus Type 25","Lotus Type 72D","Lotus Classics","Lotus Type 49","Lotus Type 98T","Maserati Alfieri","Maserati Levante S","Maserati Quattroporte GTS","Maserati 250F 6C","Maserati 250F T2 12C","Maserati GranTurismo MC GT4","Mazda 787B","Mazda MX-5 Miata NA","Mazda MX-5 ND","Mazda MX-5 Cup","Mazda RX-7 Spirit R","Mazda RX-7 Spirit R Tuned","McLaren 650S GT3","McLaren F1 GTR","McLaren MP4-12C","McLaren MP4-12C GT3","McLaren P1","McLaren P1 GTR","McLaren 570S","Mercedes-Benz SLS AMG","Mercedes-Benz SLS AMG GT3","Mercedes-Benz 190E Evo II","Mercedes-Benz AMG GT3","Mercedes-Benz C9 1989 LM","Nissan GT-R NISMO GT3","Nissan 370Z NISMO","Nissan R34 GT-R Skyline V-Spec","Pagani Huayra","Pagani Huayra BC","Pagani Zonda R","Porsche Cayenne Turbo S","Porsche Macan Turbo","Porsche Panamera G2","Porsche 935 78 Moby Dick","Porsche 991 Carrera S","Porsche 918 Spyder","Porsche 911 Carrera RSR","Porsche 718 Cayman S","Porsche 917/30 Spyder","Porsche 935/78 ‘Moby Dick’","Porsche Cayman GT4 Clubsport","Porsche 911 GT3 RS","Porsche 718 RS 60 Spyder","Porsche Cayman GT4","Porsche 718 Boxster S","Porsche 718 Boxster S PDK","Porsche 919 Hybrid 2015","Porsche 911 GT1","Porsche 962C LT (Long Tail)","Porsche 962 C ST (Short Tail)","Porsche 911 RSR 2017","Porsche 911 GT3 Cup 2017","Porsche 911 GT3 R 2016","Porsche 919 Hybrid 2016","Porsche 908 LH","Porsche 917 K","Porsche 911 R","Porsche 911 Turbo S 991","Praga R1","RUF CTR Yellowbird","RUF RT 12R","RUF RT 12R AWD","Scuderia Glickenhaus P4/5 Competizione","Scuderia Glickenhaus SCG003","Shelby Cobra 427 S/C","Tatuus FA01","Toyota Supra MK IV","Toyota Supra MK IV Drift","Toyota MK IV Time Attack","Toyota AE86","Toyota AE86 Drift","Toyota AE86 Tuned","Toyota Celica ST185","Toyota TS040 Hybrid"
    ],
    tracks: ["Autodromo dell’Umbria – Magione","Autodromo Internazionale del Mugello","Autodromo Internazionale Enzo e Dino Ferrari – Imola","Autodromo Nazionale di Monza","Autodromo Piero Taruffi – Vallelunga","Black Cat County","Brands Hatch","Circuit de Barcelona-Catalunya – Barcelona","Circuit Park Zandvoort","Circuit de Spa-Francorchamps","Drag Strip","Drift","Highlands","Laguna Seca","Nürburgring","Nürburgring Nordschleife","Red Bull Ring","Silverstone Circuit","Trento-Bondone Hill Climb"
    ] },

  { name: "Assetto Corsa Competizione",
    vehicles: ["1926 Bugatti Type 35 C","1929 Mercedes-Benz SSK","1930 Bentley 8 Litre","1930 Bentley Blower 4-1/2 Litre Supercharged","1939 Auto Union Type D","1939 Maserati 8CTF","1939 Mercedes-Benz W154","1954 Mercedes-Benz 300 SL Coupe","1955 Mercedes-Benz 300 SLR","1957 BMW Isetta 300 Export","1958 Aston Martin DBR1","1958 Austin-Healey Sprite MkI","1962 Lincoln Continental","1964 Aston Martin DB5","1965 Alfa Romeo Giulia Sprint GTA Stradale","1965 Alfa Romeo Giulia TZ2","1965 MINI Cooper S","1965 MINI Cooper S Forza Edition","1967 Lamborghini Miura P400","1967 Mercedes-Benz 280 SL","1968 Abarth 595 esseesse","1968 Alfa Romeo 33 Stradale","1968 Lancia Fulvia Coupe Rallye 1.6 HF","1970 AMC Rebel The Machine","1970 Buick GSX","1970 Mercury Cyclone Spoiler","1971 AMC Javelin AMX","1971 Lotus Elan Sprint","1972 Land Rover Series III","1973 Alpine A110 1600s","1973 AMC Gremlin X","1973 BMW 2002 Turbo","1973 Lamborghini Espada 400 GT","1973 Land Rover Range Rover","1974 Lancia Stratos HF Stradale","1979 Chevrolet Camaro Z28","1980 Abarth Fiat 131","1980 Lotus Esprit Turbo","1981 BMW M1","1983 Audi Sport quattro","1986 Audi #2 Audi Sport quattro S1","1986 BMW M635CSi","1986 Lamborghini LM 002","1986 Lancia Delta S4","1986 MG Metro 6R4","1987 Buick Regal GNX","1987 Mercedes-Benz AMG Hammer Coupe","1987 Mercedes-Benz AMG Hammer Wagon","1988 BMW M5","1988 Chevrolet Monte Carlo Super Sport","1988 Lamborghini Countach LP5000 QV","1990 Aston Martin Lagonda","1990 Mazda Savanna RX-7","1990 Mercedes-Benz 190E 2.5-16 Evolution II","1991 Bentley Turbo R","1991 BMW M3","1991 BMW X5 M","1992 Alfa Romeo 155 Q4","1992 Bugatti EB110 Super Sport","1992 Lancia Delta HF Integrale EVO","1992 Mazda 323 GT-R","1992 Mercedes-Benz 500 E","1993 Autozam AZ-1","1993 McLaren F1","1994 Mazda MX-5 Miata","1995 Audi Avant RS 2","1995 BMW 850CSi","1995 BMW M5","1995 Chevrolet Corvette ZR-1","1995 Mitsubishi Lancer Evolution III GSR","1996 Chevrolet Impala Super Sport","1997 BMW M3","1997 Lamborghini Diablo SV","1997 Lexus SC300","1997 Lotus Elise GT1", "1997 FD #777 240SX", "1997 McLaren F1 GT","1997 Mazda RX-7","1997 Mitsubishi GTO","1997 Mitsubishi Montero Evolution","1998 Mercedes-Benz AMG CLK GTR","1998 Mercedes-Benz AMG CLK GTR Forza Edition","1998 Mitsubishi FTO GP Version R","1999 Lamborghini Diablo GTR","1999 Lotus Elise Series 1 Sport 190","1999 Mitsubishi Lancer Evolution VI GSR","2000 Lotus 340R","2001 Acura Integra Type-R","2001 Audi RS 4 Avant","2002 Acura RSX Type-S","2002 BMW M3-GTR","2002 BMW Z3 M Coupe","2002 Chevrolet Corvette Z06","2002 Lotus Esprit V8","2002 Mazda RX-7 Spirit R Type-A","2003 Audi RS 6","2003 BMW M5","2004 Mitsubishi Lancer Evolution VIII MR","2005 BMW M3","2005 Mazda Mazdaspeed MX-5","2005 MG XPower SV-R","2005 Mitsubishi #1 Sierra Sierra Enterprises Lancer Evolution Time Attack","2006 Audi RS 4","2006 Mercedes-Benz E 55 AMG Wagon","2006 Mitsubishi Lancer Evolution IX MR","2007 Alfa Romeo 8C Competizione","2008 Aston Martin DBS","2008 BMW M3","2008 BMW Z4 M Coupe","2008 Lamborghini Reventon","2008 Lotus 2-Eleven","2008 MINI John Cooper Works Countryman ALL4","2008 MINI X-Raid John Cooper Works Buggy","2008 Mitsubishi Lancer Evolution X GSR","2023 Aston Martin Valkyrie","2023 BMW M2","2023 Chevrolet Corvette Z06","2023 Dodge Charger SRT Hellcat","2023 Ferrari 296 GTB","2023 Ford F-150 Raptor R","2023 Lamborghini Revuelto","2023 McLaren Solus GT","2023 Nissan Z","2023 Pagani Utopia","2023 Porsche 911 Dakar","2023 Toyota GR86","2024 Alfa Romeo Tonale","2024 Audi RS Q8","2024 BMW i4 M50","2024 Cadillac Lyriq","2024 Chevrolet Silverado EV","2024 Dodge Ram 1500 REV","2024 Ferrari Purosangue","2024 Ford Mustang Mach-E GT"
    ],
    tracks: ["24H Nürburgring (Nordschleife)","Autodromo Internazionale Enzo e Dino Ferrari – Imola","Barcelona","Brands Hatch","Circuit of the Americas (COTA)","Circuit Ricardo Tormo (Valencia)","Donington Park","Hungaroring","Indianapolis","Kyalami Grand Prix Circuit","Misano","Monza","Mount Panorama Circuit","Nürburgring","Oulton Park","Paul Ricard","Red Bull Ring","Snetterton","Silverstone","Spa-Francochamps","Suzuka Circuit","Watkins Glen","Weathertech Raceway Laguna Seca","Zandvoort","Zolder"
    ] },

  { name: "Gran Turismo 7", vehicles: [], tracks: [] },
  { name: "Nascar Heat 5",
    vehicles: ["Cup Series","Xfinity Series","Truck Series","Xtreme Dirt Tour"],
    tracks: ["Atlanta Motor Speedway","Auto Club Speedway","Bristol Motor Speedway","Bristol Motor Speedway (Dirt)","Canadian Tire Motorsports Park","Charlotte Motor Speedway","Charlotte Motor Speedway ROVAL","Chicagoland Speedway","Darlington Raceway","Daytona International Speedway","Dover International Speedway","Drebin Motor Speedway (Dirt)","Eldora Speedway","Fanatec Fairgrounds (Dirt)","Homestead-Miami Speedway","Indianapolis Motor Speedway","Indianapolis Motor Speedway ROVAL","Iowa Speedway","Jefferson Raceway (Dirt)","Kansas Speedway","Kentucky Speedway","Las Vegas Motor Speedway","Martinsville Speedway","Mid-Ohio Sports Car Course","Michigan International Speedway","New Hampshire Motor Speedway","Phoenix Raceway","Pocono Raceway","Richmond Raceway","Richmond Raceway (Dirt)","Road America","Sonoma Raceway","Talladega Superspeedway","The Dirt Track at Charlotte","The Dirt Track at Las Vegas","Texas Motor Speedway","Texas Motor Speedway Dirt Track","Watkins Glen International","World Wide Technology Raceway at Gateway"]
  },
  { name: "F1 24'", vehicles: ["Aston Martin", "Ferrari", "Mercedes", "Haas", "McLaren"], 
    tracks: ["Albert Park, Melbourne (Australia)","Algarve International Circuit, Portimão (Portugal)","Autódromo Hermanos Rodríguez, Mexico City (Mexico)","Autódromo José Carlos Pace, Interlagos (Brazil)","Baku City Circuit (Azerbaijan)","Bahrain International Circuit (Bahrain)","Circuit de Barcelona-Catalunya (Spain)","Circuit de Spa-Francorchamps (Belgium) – Remade","Circuit Gilles Villenueve, Montreal (Canada)","Circuit of the Americas (Texas, USA)","Circuit Zandvoort (The Netherlands)","Hungaroring (Hungary)","Imola, Autodromo Internazionale Enzo e Dino Ferrari (Italy)","Jeddah Corniche Circuit (Saudi Arabia) – Updated","Las Vegas Strip Street Circuit (USA)","Lusail International Circuit (Qatar) – Updated","Miami International Autodrome (USA)","Monte Carlo Grand Prix Circuit (Monaco)","Monza (Italy)","Red Bull Ring (Austria)","Shanghai International Circuit (China)","Silverstone (Great Britain) – Remade","Singapore Marina Bay (Singapore)","Suzuka (Japan)","Yas Marina Circuit (Abu Dhabi)"]
  },
  { name: "F1 25'", vehicles: ["Aston Martin", "Ferrari", "Mercedes", "Haas", "McLaren"], 
    tracks: ["Albert Park, Melbourne (Australia) – Laser-scanned","Autódromo Hermanos Rodríguez, Mexico City (Mexico)","Autódromo José Carlos Pace, Interlagos (Brazil)","Bahrain International Circuit (Bahrain) – Laser-scanned","Baku City Circuit (Azerbaijan)","Circuit de Barcelona-Catalunya (Spain)","Circuit de Spa-Francorchamps (Belgium)","Circuit Gilles Villenueve, Montreal (Canada)","Circuit of the Americas (Texas, USA)","Circuit Zandvoort (The Netherlands)","Circuit Zandvoort (The Netherlands) – Reverse","Hungaroring (Hungary)","Imola, Autodromo Internazionale Enzo e Dino Ferrari (Italy) – Laser-scanned","Imola, Autodromo Internazionale Enzo e Dino Ferrari (Italy) – Reverse","Jeddah Corniche Circuit (Saudi Arabia)","Las Vegas Strip Street Circuit (USA)","Lusail International Circuit (Qatar)","Miami International Autodrome (USA) – Laser-scanned","Monte Carlo Grand Prix Circuit (Monaco)","Monza (Italy)","Red Bull Ring (Austria)","Red Bull Ring (Austria) – Reverse","Shanghai International Circuit (China)","Silverstone (Great Britain)","Silverstone (Great Britain) – Reverse","Singapore Marina Bay (Singapore)","Suzuka (Japan) – Laser-scanned","Yas Marina Circuit (Abu Dhabi)"]
  },
  { name: "iRacing (COMING SOON)", vehicles: [], tracks: ["(COMING SOON)","Daytona International Speedway","Charlotte Motor Speedway","Sebring International Raceway","Lime Rock Park","Road Atlanta","Circuit of the Americas","Nürburgring GP","Nürburgring Nordschleife","Spa-Francorchamps","Suzuka Circuit","Monza","Silverstone Circuit","Watkins Glen","Mount Panorama Circuit","Indianapolis Motor Speedway"] },
  { name: "WreckFest", vehicles: [], tracks: ["Bonebreaker Valley","Crash Canyon","Dirt Devil Stadium","Hillstreet Circuit","Madman Stadium","Motorcity Circuit","Rattlesnake Racepark","Sandstone Raceway","Savage Speedway","Tarmac 1","Tarmac 2"] },
  { name: "WreckFest 2", vehicles: ["Roadslayer","Rocket","Striker","Ginger"], tracks: ["Junkyard Jam","Thunder Alley","Demolition Dome","Scrapyard Sprint","Ironclad Circuit","Chaos Crossing","Blitz Bowl"] },
  { name: "LeMans Ultimate (COMING SOON)", vehicles: ["Aston Martin Vantage AMR LMGT3","BMW M4 LMGT3","Corvette Z06 LMGT3","Ferrari 296 LMGT3","Ford Mustang LMGT3","McLaren 720S LMGT3 Evo","Porsche 911 GT3 R","GTE","LMGT3","Aston Martin Valkyrie","BMW M Hybrid V8","Chevrolet Corvette (C8)","Toyota GR010 Hybrid","Lamborghini SC63"], tracks: ["(COMING SOON)","Circuit de la Sarthe","Sebring International Raceway","Spa-Francorchamps","Monza","Fuji Speedway","Portimão","Bahrain International Circuit"] },
  { name: "Kart Racing|PRO (COMING SOON!!)", vehicles: ["Lightning Kart","Shadow Kart","Dragon Kart"], tracks: ["(COMING SOON)","Turbo Park","Desert Drift","Frosty Freeway","Jungle Jam","Mountain Mayhem","Skyline Circuit","Volcano Valley"] },
  { name: "Dirt Rally 2.0 (COMING SOON)", vehicles: [], tracks: ["(COMING SOON)","Argentina - Valle de los Puentes","Argentina - El Rodeo","Australia - Noorinbee Ridge","Australia - Mount Kaye Pass","New Zealand - Waimarama Point","New Zealand - Ocean Beach Sprint","Spain - Centenera","Spain - Ascenso bosque Montverd","USA - North Fork Pass","USA - Hancock Hill Sprint","Poland - Czarny Las","Poland - Marynka"] }
];

/* Why features + reviews (unchanged) */
const WHY_FEATURES = [
  { icon: "🏎️", title: "Tailored to Your Driving", desc: "Tunes made for your car, your style, your game. Feel the difference on track instantly." },
  { icon: "⚡", title: "Fast Turnaround", desc: "Receive your tune within 24 hours. Quick service, no waiting." },
  { icon: "💡", title: "Expert Knowledge", desc: "Each tune is developed and tested by a veteran team of racers." },
  { icon: "🎮", title: "Cross-Platform", desc: "Works for Xbox, PlayStation, PC – all supported games, all the best setups." }
];

const REVIEWS = [
  "“Immediately noticed better handling and corner control, they really take the time to understand your driving needs...” -SHxTLUCK",
  "“Top speed boost and smoother shifting, kept me in the top 3 at Daytona – brilliant adjustments!” -LowLeadAV",
  "“My car finally feels the way it's supposed to respond when turning, braking, and accelerating!!.” -Wintrlol",
  "“Lap consistency is way better now. Gaining anywhere from 2-5 seconds on my total lap times...” -FiveUp",
  "“Gave me the edge in my last time trial tournament in Grand Turismo...” -B1g3n3rgy#7033",
  "“Traction and throttle response improved massively...” -Retro302",
  "“Used the Elite Package for 3 tracks with the NASCAR Mustang in Forza and crushed leaderboards all week.” -Snoboi92",
  "“Gained a full tier in ranked races, finally back up to S Class!” -PartyRT",
  "“Feels pro-level now, perfect for sweaty races, League Races, or simply just having fun online.” -EZ the Megas",
  "“Super smooth ride, helps control power better, giving better response when coming into a turn.” -FTW RS99",
  "“Beat my rival by 3 seconds after installing the tune they gave me for Indianapolis Brickyard A Class.” -NoChillNate54",
  "“Didn’t think ACC could feel this responsive, with such minimal changes with the basic plan!!! Great Bang For the Buck!.” -NFSMWLEGEND",
  "“Every gear hits right, acceleration is flawless, pulls feel like I've got real G-forces on my sim rig.” -GPoe66",
  "“My drifting improved tenfold. Finally feels dialed in...” -FSCC FATAL",
  "“It’s like racing on rails – total stability upgrade.” -OG SOUR D 13"
];

/* --------- CART STATE --------- */
let cart = [];

/* --------- HELPERS --------- */
function updateCartCount() {
  const el = document.getElementById("cart-count");
  if (!el) return;
  el.textContent = cart.length;
  el.style.display = cart.length > 0 ? "inline-block" : "none";
}
function composeCartName(product, extra) {
  return [
    product.name,
    extra?.tier ? `+ ${extra.tier}` : "",
    extra?.game || "",
    extra?.vehicle || "",
    extra?.track || "",
    extra?.tracks && extra.tracks.length ? `(${extra.tracks.length} tracks)` : ""
  ].filter(Boolean).join(" / ");
}
function toUSD(n) {
  return (Math.round(Number(n) * 100) / 100).toFixed(2);
}

/* --------- CART RENDER --------- */
function renderCart() {
  const itemsEl = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  const payBtn  = document.getElementById("paypal-button-container");
  if (!itemsEl) return;

  if (cart.length === 0) {
    itemsEl.innerHTML = "<div>Your cart is empty.</div>";
    if (totalEl) totalEl.textContent = "";
    if (payBtn) payBtn.innerHTML = "";
    updateCartCount();
    return;
  }

  itemsEl.innerHTML = "";
  cart.forEach((item, i) => {
    itemsEl.insertAdjacentHTML(
      "beforeend",
      `<div class="cart-item">
         <b>${item.displayName}</b>
         <div><span style="color:red;">$${toUSD(item.price)}</span></div>
         <button class="remove-btn" onclick="removeCart(${i})">Remove</button>
       </div>`
    );
  });

  const total = cart.reduce((sum, x) => sum + Number(x.price || 0), 0);
  if (totalEl) totalEl.innerHTML = `<div class="cart-total">Total: <b>$${toUSD(total)}</b></div>`;

  renderPayPalButton();   // render Smart Buttons for full cart
  updateCartCount();
}
window.removeCart = function(i) {
  cart.splice(i, 1);
  renderCart();
  updateCartCount();
};

/* ------------- PRICING GRID (packages 1–6) ------------- */
function renderPricing() {
  const grid = document.getElementById("pricing-tiers");
  if (!grid) return;
  grid.innerHTML = "";

  // Bundles (1–3)
  bundleTiers.forEach((bundle, i) => {
    const features = bundle.features.map(f => `<li style="color:var(--accent-ice);">${f}</li>`).join("");
    const tierOptions = tierTiers.map((t, idx) =>
      `<option value="${idx}">${t.name} (+$${toUSD(t.price)})</option>`
    ).join("");

    grid.insertAdjacentHTML(
      "beforeend",
      `<div class="pricing-card" style="opacity:0;">
         <h3>${bundle.name}</h3>
         <div class="price-tag" style="color:var(--accent-ice);">$${toUSD(bundle.base)}</div>
         <ul class="features-list">${features}</ul>
         <select id="bundle-game-${i}" onchange="onBundleGame(${i})">
           <option value="">Select Game</option>
           ${GAME_DATA.map(g => `<option>${g.name}</option>`).join("")}
         </select>
         <select id="bundle-vehicle-${i}" disabled><option>Select Vehicle</option></select>
         <select id="bundle-track-${i}" disabled><option>Select Track</option></select>
         <select id="bundle-tier-${i}" disabled>
           <option value="">Select Tier</option>
           ${tierOptions}
         </select>
         <textarea id="bundle-notes-${i}" maxlength="250" rows="2" placeholder="Describe your setup / issues / goals (max 250 chars)" style="width:100%;margin:10px 0 4px 0;padding:5px;font-size:14px;resize:none;"></textarea>
         <button id="btn-bundle-${i}" disabled onclick="addBundleTier(${i})">Add To Cart</button>
       </div>`
    );
  });

  // Flat Tiers (4–6)
  tierTiers.forEach((tier, i) => {
    const idx = bundleTiers.length + i;
    const features = tier.features.map(f => `<li style="color:var(--accent-ice);">${f}</li>`).join("");

    grid.insertAdjacentHTML(
      "beforeend",
      `<div class="pricing-card" style="opacity:0;">
         <h3>${tier.name}</h3>
         <div class="price-tag" style="color:var(--accent-ice);">$${toUSD(tier.price)}</div>
         <ul class="features-list">${features}</ul>
         <select id="game-flat-${idx}" onchange="onGameFlat(${idx})">
           <option value="">Select Game</option>
           ${GAME_DATA.map(g => `<option>${g.name}</option>`).join("")}
         </select>
         <select id="car-flat-${idx}" disabled><option>Select Vehicle</option></select>
         <select id="track-flat-${idx}" disabled><option>Select Track</option></select>
         <textarea id="flat-notes-${idx}" maxlength="250" rows="2" placeholder="Describe your setup / issues / goals (max 250 chars)" style="width:100%;margin:10px 0 4px 0;padding:5px;font-size:14px;resize:none;"></textarea>
         <button id="btn-flat-${idx}" disabled onclick="addFlat(${idx})">Add To Cart</button>
       </div>`
    );
  });

  animatePricingCards();
}
function animatePricingCards() {
  if (!window.gsap) return;
  gsap.utils.toArray(".pricing-card").forEach(card => {
    gsap.timeline({
      scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none reverse" }
    }).to(card, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
  });
}

/* --------- Bundles (1–3) controls --------- */
window.onBundleGame = idx => {
  const gameSel    = document.getElementById(`bundle-game-${idx}`);
  const vehicleSel = document.getElementById(`bundle-vehicle-${idx}`);
  const trackSel   = document.getElementById(`bundle-track-${idx}`);
  const tierSel    = document.getElementById(`bundle-tier-${idx}`);
  const btn        = document.getElementById(`btn-bundle-${idx}`);

  vehicleSel.disabled = trackSel.disabled = tierSel.disabled = true;
  btn.disabled = true;
  vehicleSel.innerHTML = `<option>Select Vehicle</option>`;
  trackSel.innerHTML   = `<option>Select Track</option>`;

  const game = GAME_DATA.find(g => g.name === gameSel.value);
  if (!game) return;

  vehicleSel.innerHTML += game.vehicles.map(v => `<option>${v}</option>`).join("");
  trackSel.innerHTML   += game.tracks.map(t => `<option>${t}</option>`).join("");
  vehicleSel.disabled = false;

  vehicleSel.onchange = () => {
    trackSel.disabled = false;
    tierSel.disabled  = true;
    btn.disabled      = true;

    trackSel.onchange = () => {
      tierSel.disabled = false;
      btn.disabled     = true;

      tierSel.onchange = () => {
        btn.disabled = false;
      };
    };
  };
};
window.addBundleTier = idx => {
  const game    = document.getElementById(`bundle-game-${idx}`).value;
  const vehicle = document.getElementById(`bundle-vehicle-${idx}`).value;
  const track   = document.getElementById(`bundle-track-${idx}`).value;
  const tierIdx = document.getElementById(`bundle-tier-${idx}`).value;
  const notes   = document.getElementById(`bundle-notes-${idx}`).value.trim().slice(0, 250);
  if (!game || !vehicle || !track || tierIdx === "") {
    return alert("Please select game, vehicle, track & tier.");
  }

  const bundle = bundleTiers[idx];
  const tier   = tierTiers[parseInt(tierIdx, 10)];
  const price  = Number(bundle.base) + Number(tier.price);

  cart.push({
    kind:        "bundle",
    id:          bundle.id,
    name:        bundle.name,
    tier:        tier.name,
    game, vehicle, track,
    price,
    notes,
    displayName: composeCartName(bundle, { tier: tier.name, game, vehicle, track })
  });

  renderCart();
};

/* --------- Flat Tiers (4–6) controls --------- */
window.onGameFlat = idx => {
  const gameSel  = document.getElementById(`game-flat-${idx}`);
  const carSel   = document.getElementById(`car-flat-${idx}`);
  const trackSel = document.getElementById(`track-flat-${idx}`);
  const btn      = document.getElementById(`btn-flat-${idx}`);

  carSel.disabled = trackSel.disabled = true;
  btn.disabled    = true;
  carSel.innerHTML   = `<option>Select Vehicle</option>`;
  trackSel.innerHTML = `<option>Select Track</option>`;

  const game = GAME_DATA.find(g => g.name === gameSel.value);
  if (!game) return;

  carSel.innerHTML   += game.vehicles.map(v => `<option>${v}</option>`).join("");
  trackSel.innerHTML += game.tracks.map(t => `<option>${t}</option>`).join("");
  carSel.disabled = false;

  carSel.onchange = () => {
    trackSel.disabled = false;
    btn.disabled      = true;
    trackSel.onchange = () => btn.disabled = false;
  };
};
window.addFlat = idx => {
  const game    = document.getElementById(`game-flat-${idx}`).value;
  const vehicle = document.getElementById(`car-flat-${idx}`).value;
  const track   = document.getElementById(`track-flat-${idx}`).value;
  const notes   = document.getElementById(`flat-notes-${idx}`).value.trim().slice(0, 250);
  const tierIdx = idx - bundleTiers.length;

  if (!game || !vehicle || !track) {
    return alert("Please select game, vehicle & track.");
  }
  const pkg   = tierTiers[tierIdx];
  const price = Number(pkg.price);

  cart.push({
    kind:        "flat",
    id:          pkg.id,
    name:        pkg.name,
    game, vehicle, track,
    price,
    notes,
    displayName: composeCartName(pkg, { game, vehicle, track })
  });

  renderCart();
};

/* --------- Coaching add --------- */
window.sendCoachingRequest = () => {
  const nameEl  = document.getElementById("name-coach");
  const emailEl = document.getElementById("email-coach");
  const detEl   = document.getElementById("detail-coach");
  const name   = nameEl ? nameEl.value.trim()  : "";
  const email  = emailEl ? emailEl.value.trim() : "";
  const detail = detEl ? detEl.value.trim()     : "";

  if (!name || !email || !detail) {
    return alert("Please complete all required fields for Custom Coaching.");
  }

  cart.push({
    kind:        "coach",
    id:          coachingTier.id,
    name:        coachingTier.name,
    price:       Number(coachingTier.price),
    displayName: `Coaching for ${name} (${email}): ${detail.substring(0, 40)}…`
  });
  renderCart();
};

/* --------- CART MODAL TOGGLE --------- */
window.toggleCartModal = async () => {
  const modal = document.getElementById("cart-modal-navbar");
  if (!modal) return;
  modal.classList.toggle("show");
  renderCart();
  await paypalReady;
  renderPayPalButton();
};
document.getElementById("cart-icon-navbar")?.addEventListener("click", toggleCartModal);
document.getElementById("close-cart-modal-navbar")?.addEventListener("click", toggleCartModal);

/* --------- PAYPAL: SMART BUTTONS (FULL CART) --------- */
async function renderPayPalButton() {
  const btnContainer = document.getElementById("paypal-button-container");
  const resultMsg    = document.getElementById("result-message");
  if (!btnContainer) return;

  btnContainer.innerHTML = "";
  if (resultMsg) resultMsg.textContent = "";
  if (cart.length === 0) return;

  await paypalReady;
  if (!window.paypal || !window.paypal.Buttons) {
    btnContainer.innerHTML = "<div style='color:red;'>PayPal SDK not ready.</div>";
    return;
  }

  // Build purchase_units for the WHOLE cart
  const items = cart.map((it, i) => {
    const name = it.displayName || it.name || `Item ${i+1}`;
    const amount = toUSD(it.price || 0);
    return {
      name: name.substring(0, 127),
      unit_amount: { currency_code: "USD", value: amount },
      quantity: "1",
      category: "DIGITAL_GOODS"
    };
  });

  const total = toUSD(cart.reduce((s, it) => s + Number(it.price || 0), 0));

  const orderPayload = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: total,
          breakdown: {
            item_total: { currency_code: "USD", value: total }
          }
        },
        items
      }
    ],
    application_context: {
      shipping_preference: "NO_SHIPPING",
      user_action: "PAY_NOW",
      brand_name: "Torque Rush Garage"
    }
  };

  paypal.Buttons({
    style: { layout: "vertical", shape: "rect", label: "pay" },

    createOrder: function(data, actions) {
      return actions.order.create(orderPayload);
    },

    onApprove: async function(data, actions) {
      try {
        const details = await actions.order.capture();
        // Success UI
        const buyer = details?.payer?.name?.given_name || "there";
        if (resultMsg) resultMsg.innerHTML = `Thanks, ${buyer}! Your payment was successful.`;
        // Clear cart
        cart = [];
        renderCart();
      } catch (err) {
        if (resultMsg) resultMsg.textContent = "Payment captured but a display error occurred.";
        console.error(err);
      }
    },

    onError: function(err) {
      if (resultMsg) resultMsg.textContent = "Something went wrong with PayPal. Please try again.";
      console.error(err);
    }
  }).render(btnContainer);
}

/* ===========================================================
   NASCAR 25 — track selection UI + add logic (unchanged)
=========================================================== */
const NASCAR25_SERIES_TRACKS = {
  "CUP SERIES": [ "Bristol Motor Speedway","Charlotte Motor Speedway","Charlotte Road Course","Chicago Street Course","Circuit of the Americas","Darlington Raceway","Daytona International Speedway","Dover Motor Speedway","EchoPark Speedway","Homestead-Miami Speedway","Indianapolis Motor Speedway","Iowa Speedway","Kansas Speedway","Las Vegas Motor Speedway","Martinsville Speedway","Michigan Speedway","Nashville Superspeedway","New Hampshire Motor Speedway","North Wilkesboro Speedway","Phoenix Raceway","Pocono Raceway","Richmond Raceway","Sonoma Raceway","Talladega Superspeedway","Texas Motor Speedway","Watkins Glen International","World Wide Technology Raceway" ],
  "XFINITY SERIES": [ "Bristol Motor Speedway","Charlotte Motor Speedway","Charlotte Road Course","Chicago Street Course","Circuit of the Americas","Darlington Raceway","Daytona International Speedway","Dover Motor Speedway","EchoPark Speedway","Homestead-Miami Speedway","Indianapolis Motor Speedway","Iowa Speedway","Kansas Speedway","Las Vegas Motor Speedway","Martinsville Speedway","Michigan Speedway","Nashville Superspeedway","Phoenix Raceway","Pocono Raceway","Rockingham Speedway","Sonoma Raceway","Talladega Superspeedway","Texas Motor Speedway","Watkins Glen International","World Wide Technology Raceway" ],
  "TRUCK SERIES": [ "Bristol Motor Speedway","Charlotte Motor Speedway","Charlotte Road Course","Darlington Raceway","Daytona International Speedway","EchoPark Speedway","Homestead-Miami Speedway","Kansas Speedway","Las Vegas Motor Speedway","Lime Rock Park","Lucas Oil Indianapolis Raceway Park","Martinsville Speedway","Michigan Speedway","Nashville Superspeedway","New Hampshire Motor Speedway","North Wilkesboro Speedway","Phoenix Raceway","Pocono Raceway","Richmond Raceway","Rockingham Speedway","Talladega Superspeedway","Texas Motor Speedway","Watkins Glen International" ],
  "ARCA SERIES": [ "Bristol Motor Speedway","Charlotte Motor Speedway","Daytona International Speedway","Dover Motor Speedway","Iowa Speedway","Kansas Speedway","Lime Rock Park","Lucas Oil Indianapolis Raceway Park","Martinsville Speedway","Michigan Speedway","North Wilkesboro Speedway","Phoenix Raceway","Richmond Raceway","Rockingham Speedway","Talladega Superspeedway","Watkins Glen International" ]
};

function nascar25PackageLimit(optionLabel) {
  if (/single/i.test(optionLabel)) return 1;
  if (/5\b|5-Track/i.test(optionLabel)) return 5;
  if (/10\b|10-Track/i.test(optionLabel)) return 10;
  return Infinity; // Full series
}
function renderNascarTrackBox(card, seriesKey) {
  const select = card.querySelector(".pricing-select");
  const box = card.querySelector(".nascar-track-box");
  const status = card.querySelector(".nascar-track-status") || (function(){
    const d=document.createElement("div");
    d.className="nascar-track-status";
    d.style.marginTop="8px";
    d.style.color="#ffd700";
    card.appendChild(d);
    return d;
  })();

  box.innerHTML = "";
  box.style.display = "none";
  status.textContent = "";

  const val = select.value;
  if (!val) return;

  const seriesTracks = NASCAR25_SERIES_TRACKS[seriesKey] || [];
  const limit = nascar25PackageLimit(val);
  const isFull = /full|complete|all/i.test(val);

  if (isFull) {
    const intro = document.createElement("div");
    intro.innerHTML = `<strong>Full Series Selected — ALL 91 tracks will be included.</strong>`;
    box.appendChild(intro);
    const list = document.createElement("div");
    list.style.maxHeight = "160px";
    list.style.overflowY = "auto";
    list.style.marginTop = "8px";
    list.style.border = "1px solid rgba(255,255,255,0.06)";
    list.style.padding = "8px";
    list.style.borderRadius = "6px";
    list.innerHTML = seriesTracks.map(t => `<div style="padding:4px 0;">✔ ${t}</div>`).join("");
    box.appendChild(list);
    box.dataset.selected = JSON.stringify(seriesTracks.slice());
    status.textContent = `Tracks included: ${seriesTracks.length}/${seriesTracks.length}
    box.style.display = "block";
    return;
  }

  const info = document.createElement("div");
  info.innerHTML = `<strong>Select up to ${limit} track${limit===1?"":"s"} for this package</strong>`;
  box.appendChild(info);

  const grid = document.createElement("div");
  grid.style.display = "grid";
  grid.style.gridTemplateColumns = "1fr";
  grid.style.gap = "6px";
  grid.style.marginTop = "8px";
  grid.style.maxHeight = "190px";
  grid.style.overflowY = "auto";
  grid.style.border = "1px solid rgba(255,255,255,0.06)";
  grid.style.padding = "8px";
  grid.style.borderRadius = "6px";

  (seriesTracks).forEach((t,i) => {
    const id = `nascar-${seriesKey.replace(/\s+/g,'-')}-${i}-${Math.random().toString(36).slice(2,7)}`;
    const label = document.createElement("label");
    label.style.display = "flex";
    label.style.alignItems = "center";
    label.style.gap = "8px";
    label.style.cursor = "pointer";

    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.id = id;
    cb.value = t;
    cb.style.cursor = "pointer";

    const span = document.createElement("span");
    span.textContent = t;
    span.style.flex = "1";

    label.appendChild(cb);
    label.appendChild(span);
    grid.appendChild(label);
  });

  box.appendChild(grid);
  box.style.display = "block";
  box.dataset.selected = JSON.stringify([]);

  function refresh() {
    const inputs = Array.from(grid.querySelectorAll("input[type=checkbox]"));
    const sel = inputs.filter(x=>x.checked).map(x=>x.value);
    box.dataset.selected = JSON.stringify(sel);
    if (sel.length >= limit) {
      inputs.forEach(x=>{ if (!x.checked) { x.disabled = true; x.parentElement.style.opacity = "0.5"; }});
    } else {
      inputs.forEach(x=>{ x.disabled = false; x.parentElement.style.opacity = "1"; });
    }
    status.textContent = `Tracks selected: ${sel.length}/${limit} — ${Math.max(0, limit - sel.length)} left`;
  }
  grid.addEventListener("change", refresh);
  refresh();
}
function handleNascarAdd(card, seriesKey) {
  const select = card.querySelector(".pricing-select");
  const optionValue = select.value;
  const optionText = select.options[select.selectedIndex]?.text || select.value;
  if (!optionValue) return alert("Select an option first.");

  const priceMatch = optionText.match(/\$([\d.]+)/);
  const price = priceMatch ? parseFloat(priceMatch[1]) : 0;

  const box = card.querySelector(".nascar-track-box");
  let tracks = [];
  if (box && box.dataset.selected) {
    try { tracks = JSON.parse(box.dataset.selected) || []; } catch(e) { tracks = []; }
  }

  // enforce counts
  if (/single/i.test(optionText) && tracks.length !== 1) return alert("Single track package requires exactly 1 track selected.");
  if (/5-Track|5 Track/i.test(optionText) && tracks.length !== 5) return alert("Please select exactly 5 tracks for the 5-Track Pack.");
  if (/10-Track|10 Track/i.test(optionText) && tracks.length !== 10) return alert("Please select exactly 10 tracks for the 10-Track Pack.");

  const isFull = /full|complete|all/i.test(optionText);
  if (!isFull && tracks.length === 0) return alert("Please select your tracks for this package.");
  if (isFull && (!tracks || tracks.length === 0)) {
    tracks = NASCAR25_SERIES_TRACKS[seriesKey] || [];
  }

  const productName = `${seriesKey} — ${optionText}`;
  const displayName = composeCartName({ name: productName }, { tracks });

  cart.push({
    kind:  "nascar25",
    id:    `nascar25-${seriesKey}-${optionValue}`,
    name:  productName,
    series: seriesKey,
    option: optionValue,
    price: price,
    tracks: tracks,
    displayName
  });

  renderCart();

  const btn = card.querySelector(".add-btn");
  if (btn) {
    const prev = btn.textContent;
    btn.disabled = true; btn.textContent = "Added!";
    setTimeout(()=>{ btn.disabled=false; btn.textContent=prev; }, 900);
  }
}
function initNascar25Integration() {
  const section = document.getElementById("nascar25");
  if (!section) return;
  const cards = section.querySelectorAll(".pricing-card");
  cards.forEach(card => {
    const seriesKey = (card.dataset.series || "").toUpperCase() || (function(){
      const t=card.querySelector("h2")?.textContent?.toUpperCase()||"";
      if (t.includes("CUP")) return "CUP SERIES";
      if (t.includes("XFINITY")) return "XFINITY SERIES";
      if (t.includes("TRUCK")) return "TRUCK SERIES";
      if (t.includes("ARCA")) return "ARCA SERIES";
      if (t.includes("ALL")) return "ALL";
      return "CUP SERIES";
    })();

    const trackBox = card.querySelector(".nascar-track-box");
    if (trackBox) trackBox.style.display = "none";

    const select = card.querySelector(".pricing-select");
    if (select) {
      const clone = select.cloneNode(true);
      select.parentNode.replaceChild(clone, select);
      clone.addEventListener("change", () => renderNascarTrackBox(card, seriesKey));
    }

    const btn = card.querySelector(".add-btn");
    if (btn) {
      const cloneBtn = btn.cloneNode(true);
      btn.parentNode.replaceChild(cloneBtn, btn);
      cloneBtn.addEventListener("click", () => handleNascarAdd(card, seriesKey));
    }
  });
}

/* --------- DOM READY --------- */
document.addEventListener("DOMContentLoaded", () => {
  ["pricing", "reviews", "why-tune"].forEach(id => {
    const section = document.getElementById(id);
    if (!section) return;
    const title = section.querySelector(".section-title, .gold-center-title");
    if (title) title.classList.add("section-title-centered");
  });

  const nav = document.getElementById("navbar");
  if (nav) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) nav.classList.replace("transparent", "solid");
      else nav.classList.replace("solid", "transparent");
    });
  }

  if (window.gsap) {
    gsap.from(".main-hero-title", { y: 50, opacity: 0, duration: 1, ease: "power3.out" });
    gsap.from(".hero-desc", { y: 30, opacity: 0, delay: 0.3, duration: 0.8 });
    gsap.from(".hero-cta", { scale: 0.8, opacity: 0, delay: 0.6, duration: 0.6 });
    document.querySelectorAll(".fade-section").forEach(sec => {
      gsap.to(sec, {
        opacity: 1, y: 0, ease: "power2.out",
        scrollTrigger: { trigger: sec, start: "top 80%", toggleActions: "play none none none" }
      });
    });
  }

  const whyGrid = document.getElementById("why-tune-features-grid");
  if (whyGrid) {
    whyGrid.innerHTML = WHY_FEATURES.map(f =>
      `<div class="why-feature-container">
         <div class="why-feature-icon">${f.icon}</div>
         <div class="why-feature-title">${f.title}</div>
         <div class="why-feature-desc" style="color:var(--accent-ice);">${f.desc}</div>
       </div>`
    ).join("");
  }

  let reviewIndex = 0;
  const box = document.getElementById("review-box");
  function showReview() {
    if (!box) return;
    box.style.opacity = 0;
    setTimeout(() => {
      box.textContent = REVIEWS[reviewIndex];
      box.style.opacity = 1;
      reviewIndex = (reviewIndex + 1) % REVIEWS.length;
    }, 400);
  }
  showReview();
  setInterval(showReview, 5000);

  renderPricing();
  initNascar25Integration();
  renderCart();

  window.scrollToSection = id => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };
});
