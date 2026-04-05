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

  if (!Array.isArray(cart) || cart.length === 0) return;

  await paypalReady;
  if (!window.paypal || !window.paypal.Buttons) {
    btnContainer.innerHTML =
      "<div style='color:red;'>PayPal SDK not ready.</div>";
    return;
  }

  const items = cart.map((it, i) => {
    let name = it.displayName || it.name || `Item ${i + 1}`;
    if (name.length > 127) name = name.slice(0, 124) + "...";

    return {
      name,
      unit_amount: {
        currency_code: "USD",
        value: Number(it.price || 0).toFixed(2)
      },
      quantity: "1",
      category: "DIGITAL_GOODS"
    };
  });

  const total = cart.reduce((sum, x) => {
    const p = Number(x?.price);
    return sum + (Number.isFinite(p) ? p : 0);
  }, 0);

  let orderDescription = cart
    .map((it, i) => (it.displayName || it.name || `Item ${i + 1}`))
    .join(" | ");

  if (orderDescription.length > 127) {
    orderDescription = orderDescription.slice(0, 124) + "...";
  }

  let customId = JSON.stringify(
  cart.map((it) => ({
    kind: it.kind || "",
    id: it.id || "",
    name: it.name || "",
    displayName: it.displayName || "",
    series: it.series || "",
    packageType: it.packageType || it.option || "",
    tracks: Array.isArray(it.tracks) ? it.tracks : [],
    game: it.game || "",
    vehicle: it.vehicle || "",
    track: it.track || "",
    notes: it.notes || "",
    price: Number(it.price || 0).toFixed(2)
  }))
);

  if (customId.length > 255) {
    customId = customId.slice(0, 252) + "...";
  }

  try {
    paypal
      .Buttons({
        style: { layout: "vertical", height: 45 },

        createOrder: (data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: orderDescription,
                custom_id: customId,
                amount: {
                  currency_code: "USD",
                  value: total.toFixed(2),
                  breakdown: {
                    item_total: {
                      currency_code: "USD",
                      value: total.toFixed(2)
                    }
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
          });
        },

        onApprove: async (data, actions) => {
          try {
            const details = await actions.order.capture();
            console.log("PAYPAL CAPTURE DETAILS:", details);
            console.log("CART FULFILLMENT DATA:", cart);

            if (msgEl) {
              msgEl.textContent = "Payment complete. Order " + details.id;
            }

            cart = [];
            renderCart();
          } catch (e) {
            if (msgEl) {
              msgEl.textContent = "Capture failed: " + (e?.message || e);
            }
          }
        },

        onError: (err) => {
          if (msgEl) {
            msgEl.textContent = "PayPal error: " + (err?.message || err);
          }
        }
      })
      .render("#paypal-button-container");
  } catch (e) {
    btnContainer.innerHTML =
      "<div style='color:red;'>Unable to render PayPal button.</div>";
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
  "CUP SERIES": {
    single: "S8BUTCHGK7B3S",
    "5-pack": "URUPKF6T4J58Q",
    "10-pack": "BNPC5WU3HWNDC",
    full: "2NQCDC6HUMB9A"
  },
  "XFINITY SERIES": {
    single: "SUXU4HFAYPRWS",
    "5-pack": "NJFZDM7HFAQAG",
    "10-pack": "V6TVD23QL4A92",
    full: "CUPKXGK4R9WZ4"
  },
  "TRUCK SERIES": {
    single: "XXTYBE4ZERYPQ",
    "5-pack": "ZTXVVBHQ7AWEJ",
    "10-pack": "ALAZG66PSLTP4",
    full: "V2QYFUA4MLM7S"
  },
  "ARCA SERIES": {
    single: "4FGC9DF9WVJMC",
    "5-pack": "HZ9D33868T5T4",
    "10-pack": "CK5DLLNP266SJ",
    full: "KT3UJTTW77VGS"
  },
  ALL: { full: "V6SK8DHPEPLJN" }
};

/* Bundles 1–3 (kept for UI + price) */
const bundleTiers = [
  {
    id: "bundle1",
    name: "1 Car / 1 Track",
    type: "bundle",
    base: 22.99,
    buttons: {
      basic: "2KGP2JW5PKKNN",
      pro: "DHKV5RKHKQB32",
      elite: "LUE2Y5WX7EMQ6"
    },
    features: ["Car tuning package", "Performance boost", "Optimized setups"]
  },
  {
    id: "bundle2",
    name: "1 Car / 2 Tracks or 2 Cars / 1 Track",
    type: "bundle",
    base: 25.99,
    buttons: {
      basic: "5S4HW9MCNKYPL",
      pro: "FN5W773LP2344",
      elite: "DJDHMVBSSEASG"
    },
    features: ["Advanced handling tweaks", "Racing optimization"]
  },
  {
    id: "bundle3",
    name: "1 Car / 3 Tracks or 3 Cars / 1 Track",
    type: "bundle",
    base: 32.99,
    buttons: {
      basic: "WND9YDDEG96LU",
      pro: "TH4L6EPNC9E78",
      elite: "XHFKZ5PDA527L"
    },
    features: [
      "Optimized car & track combo",
      "Tailored tune for events",
      "Fast delivery",
      "--1 FREE TUNE FOR 1 MORE CAR UPON PURCHASE--"
    ]
  }
];

/* Flat tiers (kept for UI + price) */
const tierTiers = [
  {
    id: "basic",
    name: "Basic",
    type: "flat",
    price: 5.99,
    code: "ZWD86SFTG8LCW",
    features: [
      "Single car setup",
      "Performance adjustments",
      "Up to 3 Adjustments Per Car",
      "Tires",
      "Camber",
      "Springs",
      "Suspension",
      "Brakes"
    ]
  },
  {
    id: "pro",
    name: "Pro",
    type: "flat",
    price: 9.99,
    code: "MK7RA8J87U7VY",
    features: [
      "All Basic features",
      "Gearing, suspension, tires & aerodynamics",
      "Up to 6 Adjustments Per Car",
      "Tires",
      "Camber",
      "Anti-Roll Bars",
      "Aero",
      "Brakes",
      "Differentials"
    ]
  },
  {
    id: "elite",
    name: "Elite",
    type: "flat",
    price: 16.99,
    code: "N6ZFC5VKSYTFA",
    features: [
      "Full race-ready custom setup",
      "Peak performance tuning",
      "Up to 10 Adjustments Per Car",
      "Tires",
      "Camber",
      "Toe and Caster",
      "Springs",
      "Anti-Roll Bars",
      "Dampers",
      "Suspension Geometry",
      "Aero",
      "Brakes",
      "Differentials"
    ]
  }
];

/* Coaching */
const coachingTier = {
  id: "coach",
  name: "Custom Coaching",
  type: "coach",
  price: 59.99,
  code: "EEFRHEEQ8A4SA",
  features: [
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
      "1926 Bugatti Type 35 C",
      "1929 Mercedes-Benz SSK",
      "1930 Bentley 8 Litre",
      "1930 Bentley Blower 4-1/2 Litre Supercharged",
      "1939 Auto Union Type D",
      "1939 Maserati 8CTF",
      "1939 Mercedes-Benz W154",
      "1954 Mercedes-Benz 300 SL Coupe",
      "1955 Mercedes-Benz 300 SLR",
      "1957 BMW Isetta 300 Export",
      "1958 Aston Martin DBR1",
      "1958 Austin-Healey Sprite MkI",
      "1962 Lincoln Continental",
      "1964 Aston Martin DB5",
      "1965 Alfa Romeo Giulia Sprint GTA Stradale",
      "1965 Alfa Romeo Giulia TZ2",
      "1965 MINI Cooper S",
      "1965 MINI Cooper S Forza Edition",
      "1967 Lamborghini Miura P400",
      "1967 Mercedes-Benz 280 SL",
      "1968 Abarth 595 esseesse",
      "1968 Alfa Romeo 33 Stradale",
      "1968 Lancia Fulvia Coupe Rallye 1.6 HF",
      "1969 Lola #6 Penske Sunoco T70 MkIIIB",
      "1970 AMC Rebel The Machine",
      "1970 Buick GSX",
      "1970 Mercury Cyclone Spoiler",
      "1971 AMC Javelin AMX",
      "1971 Lotus Elan Sprint",
      "1971 Meyers Manx",
      "1971 Meyers Manx Forza Edition",
      "1972 Land Rover Series III",
      "1973 Alpine A110 1600s",
      "1973 AMC Gremlin X",
      "1973 BMW 2002 Turbo",
      "1973 Lamborghini Espada 400 GT",
      "1973 Land Rover Range Rover",
      "1974 Lancia Stratos HF Stradale",
      "1979 Chevrolet Camaro Z28",
      "1980 Abarth Fiat 131",
      "1980 Lotus Esprit Turbo",
      "1981 BMW M1",
      "1983 Audi Sport quattro",
      "1986 Audi #2 Audi Sport quattro S1",
      "1986 BMW M635CSi",
      "1986 Lamborghini LM 002",
      "1986 Lancia Delta S4",
      "1986 MG Metro 6R4",
      "1987 Buick Regal GNX",
      "1987 Mercedes-Benz AMG Hammer Coupe",
      "1987 Mercedes-Benz AMG Hammer Wagon",
      "1988 BMW M5",
      "1988 Chevrolet Monte Carlo Super Sport",
      "1988 Lamborghini Countach LP5000 QV",
      "1990 Aston Martin Lagonda",
      "1990 Mazda Savanna RX-7",
      "1990 Mercedes-Benz 190E 2.5-16 Evolution II",
      "1991 Bentley Turbo R",
      "1991 BMW M3",
      "1991 BMW X5 M",
      "1992 Alfa Romeo 155 Q4",
      "1992 Bugatti EB110 Super Sport",
      "1992 Lancia Delta HF Integrale EVO",
      "1992 Mazda 323 GT-R",
      "1992 Mercedes-Benz 500 E",
      "1993 Autozam AZ-1",
      "1993 McLaren F1",
      "1994 Mazda MX-5 Miata",
      "1995 Audi Avant RS 2",
      "1995 BMW 850CSi",
      "1995 BMW M5",
      "1995 Chevrolet Corvette ZR-1",
      "1995 Mitsubishi Lancer Evolution III GSR",
      "1996 Chevrolet Impala Super Sport",
      "1997 BMW M3",
      "1997 Lamborghini Diablo SV",
      "1997 Lexus SC300",
      "1997 Lotus Elise GT1",
      "1997 McLaren F1 GT",
      "1997 Mazda RX-7",
      "1997 Mitsubishi GTO",
      "1997 Mitsubishi Montero Evolution",
      "1998 Mercedes-Benz AMG CLK GTR",
      "1998 Mercedes-Benz AMG CLK GTR Forza Edition",
      "1998 Mitsubishi FTO GP Version R",
      "1999 Lamborghini Diablo GTR",
      "1999 Lotus Elise Series 1 Sport 190",
      "1999 Mitsubishi Lancer Evolution VI GSR",
      "2000 Lotus 340R",
      "2001 Acura Integra Type-R",
      "2001 Audi RS 4 Avant",
      "2002 Acura RSX Type-S",
      "2002 BMW M3-GTR",
      "2002 BMW Z3 M Coupe",
      "2002 Chevrolet Corvette Z06",
      "2002 Lotus Esprit V8",
      "2002 Mazda RX-7 Spirit R Type-A",
      "2003 Audi RS 6",
      "2003 BMW M5",
      "2004 Mitsubishi Lancer Evolution VIII MR",
      "2005 BMW M3",
      "2005 Mazda Mazdaspeed MX-5",
      "2005 MG XPower SV-R",
      "2005 Mitsubishi #1 Sierra Enterprises Lancer Evolution Time Attack",
      "2005 Nissan 350Z Nismo",
      "2006 Audi S4",
      "2006 BMW Z4 M Roadster",
      "2006 Chevrolet Corvette Z06",
      "2007 BMW 335i",
      "2007 Ferrari F430 Scuderia",
      "2007 Porsche 911 Turbo",
      "2008 Audi RS4",
      "2008 BMW M3",
      "2008 Chevrolet Corvette ZR1",
      "2008 Dodge Viper SRT10 ACR",
      "2008 Mitsubishi Lancer Evolution X GSR",
      "2009 Ford Focus RS",
      "2009 Nissan GT-R",
      "2009 Porsche 911 Carrera S",
      "2010 Aston Martin V12 Vantage",
      "2010 Audi R8 5.2 FSI Quattro",
      "2010 BMW M5",
      "2010 Chevrolet Camaro SS",
      "2010 Dodge Challenger SRT8",
      "2010 Ford Shelby GT500",
      "2011 Lamborghini Gallardo LP 570-4 Superleggera",
      "2011 Porsche 911 GT3 RS 4.0",
      "2012 Bugatti Veyron 16.4 Super Sport",
      "2012 Chevrolet Corvette ZR1",
      "2012 Ferrari 458 Italia",
      "2013 McLaren P1",
      "2013 Nissan GT-R Black Edition",
      "2013 Pagani Huayra",
      "2014 Chevrolet Camaro Z28",
      "2014 Jaguar F-Type R",
      "2015 Ford Mustang GT350",
      "2015 Mercedes-Benz AMG GT",
      "2015 Porsche 911 GT3 RS",
      "2016 Audi R8 V10 Plus",
      "2016 BMW M4 GTS",
      "2016 Chevrolet Camaro ZL1",
      "2016 Ford Focus RS",
      "2016 Nissan GT-R Nismo",
      "2016 Porsche 911 Turbo S",
      "2017 Alfa Romeo Giulia Quadrifoglio",
      "2017 Audi RS3",
      "2017 Bugatti Chiron",
      "2017 Chevrolet Corvette Grand Sport",
      "2017 Dodge Viper ACR",
      "2017 Ford GT",
      "2017 Porsche 911 GT2 RS",
      "2018 Aston Martin Vantage",
      "2018 BMW M5",
      "2018 Ferrari 488 Pista",
      "2018 Ford Mustang GT",
      "2018 Nissan GT-R",
      "2019 Audi RS5",
      "2019 BMW Z4 M40i",
      "2019 Chevrolet Corvette ZR1",
      "2019 Ferrari F8 Tributo",
      "2019 Lamborghini Aventador SVJ",
      "2019 McLaren 720S",
      "2020 Aston Martin DBS Superleggera",
      "2020 Audi RS7",
      "2020 BMW M8 Competition",
      "2020 Bugatti Chiron Pur Sport",
      "2020 Chevrolet Corvette Stingray",
      "2020 Ferrari 812 GTS",
      "2020 Ford Mustang Shelby GT500",
      "2020 Lamborghini Huracán EVO",
      "2020 Nissan GT-R Nismo",
      "2021 Audi RS5 Coupe",
      "2021 BMW M4",
      "2021 Ferrari SF90 Stradale",
      "2021 Ford Mustang Mach 1",
      "2021 Lamborghini Huracán STO",
      "2021 McLaren Artura",
      "2021 Porsche 911 Turbo S",
      "2021 Toyota Supra",
      "2022 Chevrolet Camaro ZL1",
      "2022 Ford Bronco Raptor",
      "2022 Hyundai N Vision 74",
      "2022 Lamborghini Countach LPI 800-4",
      "2022 Porsche 911 GT3 RS",
      "2023 Aston Martin Valhalla",
      "2023 BMW M2",
      "2023 Chevrolet Corvette Z06",
      "2023 Dodge Charger SRT Hellcat",
      "2023 Ferrari 296 GTB",
      "2023 Ford F-150 Raptor R",
      "2023 Lamborghini Revuelto",
      "2023 McLaren Solus GT",
      "2023 Nissan Z",
      "2023 Pagani Utopia",
      "2023 Porsche 911 Dakar",
      "2023 Toyota GR86",
      "2024 Alfa Romeo Tonale",
      "2024 Audi RS Q8",
      "2024 BMW i4 M50",
      "2024 Cadillac Lyriq",
      "2024 Chevrolet Silverado EV",
      "2024 Dodge Ram 1500 REV",
      "2024 Ferrari Purosangue",
      "2024 Ford Mustang Mach-E GT",
      "2024 Genesis GV80",
      "2024 Hyundai Ioniq 6",
      "2024 Infiniti QX80",
      "2024 Jaguar F-Type",
      "2024 Lamborghini Huracán Tecnica",
      "2024 Lexus LX 600",
      "2024 Lucid Air Dream Edition",
      "2024 Maserati Grecale Trofeo",
      "2024 Mazda CX-90",
      "2024 Mercedes-Benz EQS",
      "2024 Nissan Ariya",
      "2024 Porsche Taycan Turbo S",
      "2024 Rivian R1T",
      "2024 Rolls-Royce Spectre",
      "2024 Subaru WRX STI",
      "2024 Tesla Model S Plaid",
      "2024 Toyota Sequoia",
      "2024 Volkswagen ID. Buzz",
      "2024 Volvo XC90 Recharge"
    ],
    tracks: [
      "Drag",
      "Roll Racing",
      "Circuit",
      "Sprint",
      "Drift (Beta)",
      "Rally (Beta)",
      "Cruise"
    ]
  },

  {
    name: "Forza Motorsports",
    vehicles: [
"2017 Abarth 124 Spider",
"2022 Acura NSX Type S",
"2020 Acura #6 ARX-05 DPi",
"2018 Acura #36 NSX GT3",
"2017 Acura NSX",
"2001 Acura Integra Type R",
"2017 Alfa Romeo Giulia Quadrifoglio",
"2014 Alfa Romeo 4C",
"2011 Alfa Romeo Giulietta Quadrifoglio Verde",
"1965 Alfa Romeo Giulia Sprint GTA Stradale",
"2017 Alpine A110",
"1990 Alpine GTA Le Mans",
"1971 AMC Javelin AMX",
"1970 AMC Rebel The Machine",
"2018 Apollo Intensa Emozione",
"2013 Ariel Atom 500 V8",
"2023 Aston Martin Valkyrie",
"2022 Aston Martin Valkyrie AMR Pro",
"2019 Aston Martin Valhalla Concept Car",
"2019 Aston Martin DBS Superleggera",
"2019 Aston Martin Vantage",
"2018 Aston Martin #97 AMR Vantage GTE",
"2017 Aston Martin Vulcan AMR Pro",
"2017 Aston Martin #7 Aston Martin Racing V12 Vantage GT3",
"2017 Aston Martin Vanquish Zagato Coupe",
"2016 Aston Martin Vulcan",
"2015 Aston Martin Vantage GT12",
"2013 Aston Martin V12 Vantage S",
"2008 Aston Martin DBS",
"2001 Aston Martin V12 Vanquish",
"1998 Aston Martin V8 Vantage V600",
"1989 Aston Martin #18 Aston Martin AMR1",
"1967 Aston Martin DBS",
"1964 Aston Martin DB5",
"1960 Aston Martin DB4 GT Zagato",
"1958 Aston Martin DBR1",
"2021 Audi RS e-tron GT",
"2021 Audi RS 6 Avant",
"2021 Audi RS 7 Sportback",
"2020 Audi R8 V10 performance",
"2020 Audi TT RS Coupe",
"2020 Audi RS 3 Sedan",
"2018 Audi #44 R8 LMS GT3",
"2018 Audi #1 Audi Sport RS 3 LMS",
"2018 Audi TT RS",
"2018 Audi RS 5 Coupe",
"2018 Audi RS 4 Avant",
"2016 Audi #17 Rotek Racing TT RS",
"2016 Audi R8 V10 plus",
"2015 Audi RS 6 Avant",
"2015 Audi S1",
"2014 Audi #2 Audi Team Joest R18 e-tron quattro",
"2013 Audi R8 Coupé V10 plus 5.2 FSI quattro",
"2013 Audi RS 7 Sportback",
"2013 Audi RS 4 Avant",
"2011 Audi RS 3 Sportback",
"2010 Audi R8 Coupé 5.2 FSI quattro",
"2006 Audi RS 4",
"2004 Audi S4",
"2003 Audi RS 6",
"2001 Audi RS 4 Avant",
"1995 Audi Avant RS 2",
"1989 Audi #4 Audi 90 quattro IMSA GTO",
"1984 Audi Sport quattro",
"1965 Austin-Healey 3000 MkIII",
"1939 Auto Union Type D",
"2020 Automobili Pininfarina Battista",
"2014 BAC Mono",
"2017 Bentley Continental Supersports",
"2014 Bentley #17 M-Sport Bentley Continental GT3",
"2003 Bentley #7 Team Bentley Speed 8",
"2023 BMW #25 BMW Team RLL M Hybrid V8",
"2023 BMW #96 Turner Motorsports M4 GT3",
"2023 BMW M2",
"2021 BMW M3 Competition Sedan",
"2021 BMW M4 Competition Coupé",
"2020 BMW M8 Competition Coupé",
"2020 BMW M2 Competition Coupé",
"2019 BMW Z4 Roadster",
"2018 BMW #1 BMW M Motorsport M8 GTE",
"2018 BMW M5",
"2017 BMW #24 BMW Team RLL M6 GTLM",
"2016 BMW M4 GTS",
"2015 BMW i8",
"2014 BMW M4 Coupé",
"2013 BMW M6 Coupé",
"2012 BMW M5",
"2011 BMW 1 Series M Coupé",
"2010 BMW M3 GTS",
"2010 BMW M6 Coupé",
"2009 BMW M5",
"2008 BMW M3",
"2005 BMW M3",
"2003 BMW M5",
"2002 BMW M3-GTR",
"2002 BMW Z3 M Coupé",
"2000 BMW 323ti Sport",
"1999 BMW #16 BMW Motorsport V12 LMR",
"1999 BMW #15 BMW Motorsport V12 LMR",
"1997 BMW M3",
"1995 BMW 850CSi",
"1991 BMW M3",
"1988 BMW M5",
"1986 BMW M635 CSi",
"1981 BMW M1",
"1979 BMW #6 BMW Motorsport M1 Procar",
"1976 BMW #1 BMW 3.0 CSL",
"1975 BMW #25 BMW Motorsport 3.0 CSL",
"1973 BMW 2002 Turbo",
"2019 Brabham BT62",
"1967 Brabham BT24",
"1964 Brabham BT8",
"1974 BRM #14 Team Motul P201",
"2019 Bugatti Divo",
"2018 Bugatti Chiron",
"2011 Bugatti Veyron Super Sport",
"1992 Bugatti EB110 Super Sport",
"1926 Bugatti Type 35 C",
"1987 Buick Regal GNX",
"1985 Buick #6 Performance Motorsports Somerset Regal Trans-Am",
"1970 Buick GSX",
"2023 Cadillac #31 Whelen Engineering Cadillac Racing V-Series.R",
"2023 Cadillac #2 Cadillac Racing V-Series.R",
"2023 Cadillac #01 Cadillac Racing V-Series.R",
"2022 Cadillac CT5-V Blackwing",
"2022 Cadillac CT4-V Blackwing",
"2021 Cadillac #31 Whelen Racing DPi-V.R",
"2018 Cadillac #57 TA CTS-V",
"2016 Cadillac CTS-V Sedan",
"2016 Cadillac ATS-V",
"2015 Cadillac #3 Cadillac Racing ATS-V.R",
"2014 Cadillac CTS-V Sport Wagon",
"2013 Caterham Superlight R500",
"1966 Chaparral #66 Chaparral Cars 2E",
"2025 Chevrolet IndyCar",
"2024 Chevrolet NASCAR Next Gen Camaro ZL1",
"2024 Chevrolet Corvette E-Ray",
"2023 Chevrolet Corvette Z06",
"2020 Chevrolet #3 Corvette Racing C8.R",
"2020 Chevrolet Corvette Stingray Coupe Forza Edition",
"2020 Chevrolet Corvette Stingray Coupe",
"2019 Chevrolet Corvette ZR1",
"2018 Chevrolet #23 Ruman Racing TA Corvette",
"2018 Chevrolet Camaro ZL1 1LE Forza Edition",
"2018 Chevrolet Camaro ZL1 1LE",
"2017 Chevrolet Camaro ZL1",
"2016 Chevrolet Camaro Super Sport",
"2015 Chevrolet #10 Konica Minolta Corvette Daytona Prototype",
"2015 Chevrolet Corvette Z06",
"2014 Chevrolet #3 Corvette Racing Corvette C7.R",
"2010 Chevrolet #55 Level 5 Motorsports Oreca FLM09",
"2009 Chevrolet Corvette ZR1",
"2002 Chevrolet Corvette Z06",
"2002 Chevrolet Camaro 35th Anniversary Super Sport",
"1995 Chevrolet Corvette ZR-1",
"1990 Chevrolet Camaro IROC-Z",
"1988 Chevrolet Monte Carlo Super Sport",
"1988 Chevrolet #77 Beretta Trans Am",
"1976 Chevrolet #76 Greenwood Corvette",
"1970 Chevrolet Corvette ZR-1",
"1970 Chevrolet Chevelle Super Sport 454",
"1970 Chevrolet Camaro Z28",
"1969 Chevrolet Nova Super Sport 396",
"1969 Chevrolet Camaro Jordan Luka 3 Motorsport Edition",
"1969 Chevrolet Camaro Super Sport Coupe",
"1967 Chevrolet Corvette Stingray 427",
"1964 Chevron B16",
"1972 Chrysler VH Valiant Charger R/T E49",
"2011 Citroën DS 3 Racing",
"1979 Datsun #33 280ZX Turbo",
"1970 Datsun 510",
"1969 Datsun 2000 Roadster",
"1984 De Tomaso Pantera GT5",
"2019 Dodge #9 American V8 Road Racing TA Challenger",
"2018 Dodge Challenger SRT Demon",
"2016 Dodge Viper ACR",
"2015 Dodge Charger SRT Hellcat",
"2014 Dodge #93 SRT Motorsports Viper GTS-R",
"2013 Dodge Dart GT",
"2012 Dodge Challenger SRT8",
"2008 Dodge Viper SRT10 ACR",
"2005 Dodge SRT-4 ACR",
"1999 Dodge Viper GTS ACR",
"1996 Dodge Stealth R/T Turbo",
"1986 Dodge Shelby Omni GLHS",
"1970 Dodge Coronet Super Bee",
"1970 Dodge Challenger R/T",
"1969 Dodge Charger Daytona HEMI",
"1969 Dodge Charger R/T",
"2013 Donkervoort D8 GTO",
"1998 Eagle Talon TSi Turbo",
"1967 Eagle-Weslake T1G",
"2019 Elemental RP1",
"2018 Exomotive Exocet Sport V8 XP-5",
"2022 Ferrari 296 GTB",
"2020 Ferrari SF90 Stradale",
"2020 Ferrari Roma",
"2019 Ferrari #62 Risi Competizione 488 GTE",
"2019 Ferrari 488 Pista",
"2019 Ferrari F8 Tributo",
"2019 Ferrari Monza SP2",
"2018 Ferrari FXX-K Evo",
"2018 Ferrari Portofino",
"2017 Ferrari #25 Corse Clienti 488 Challenge",
"2017 Ferrari 812 Superfast",
"2017 Ferrari J50",
"2015 Ferrari F12tdf",
"2015 Ferrari 488 GTB",
"2014 Ferrari FXX K",
"2014 Ferrari California T",
"2013 Ferrari LaFerrari",
"2013 Ferrari 458 Speciale",
"2012 Ferrari 599XX Evolution",
"2011 Ferrari #62 Risi Competizione F458 Italia GTC",
"2010 Ferrari 599XX",
"2009 Ferrari 458 Italia",
"2007 Ferrari 430 Scuderia",
"2003 Ferrari 360 Challenge Stradale",
"2002 Ferrari Enzo Ferrari",
"2002 Ferrari 575M Maranello",
"1998 Ferrari #12 Risi Competizione F333 SP",
"1996 Ferrari F50 GT",
"1995 Ferrari F50",
"1994 Ferrari F355 Berlinetta",
"1992 Ferrari 512 TR",
"1990 Ferrari #1 Scuderia Ferrari 641",
"1989 Ferrari F40 Competizione",
"1987 Ferrari F40",
"1984 Ferrari 288 GTO",
"1982 Ferrari #72 N.A.R.T. 512 BB/LM",
"1976 Ferrari #1 Scuderia Ferrari 312 T2",
"1970 Ferrari 512 S",
"1969 Ferrari Dino 246 GT",
"1967 Ferrari #24 Ferrari Spa 330 P4",
"1964 Ferrari F-158",
"1963 Ferrari 250LM",
"1962 Ferrari 250 GTO",
"1962 Ferrari 250 GT Berlinetta Lusso",
"1957 Ferrari 250 Testa Rossa",
"1953 Ferrari 500 Mondial",
"1948 Ferrari 166 Inter Sport",
"2024 Ford NASCAR Next Gen Mustang Dark Horse",
"2024 Ford #25 Mustang RTR",
"2024 Ford #88 Mustang RTR",
"2024 Ford #130 Mustang RTR",
"2024 Ford Mustang Dark Horse",
"2024 Ford Mustang GT",
"2024 Ford Mustang GT3",
"2020 Ford Mustang Shelby GT500",
"2018 Ford #98 Breathless Pro Racing TA Mustang",
"2018 Ford Mustang GT",
"2017 Ford GT",
"2017 Ford #17 Shell V-Power Racing Team Falcon FG X",
"2017 Ford Focus RS",
"2016 Ford #66 Ford Racing GT Le Mans",
"2016 Ford Shelby GT-350R",
"2015 Ford #02 Chip Ganassi Racing Riley Mk XXVI Daytona Prototype",
"2015 Ford Falcon GT F 351",
"2014 Ford FPV Limited Edition Pursuit Ute",
"2014 Ford #17 AMD Tuning Focus ST BTCC",
"2013 Ford Shelby GT500",
"2009 Ford Focus RS",
"2005 Ford Ford GT",
"2003 Ford Focus RS",
"2000 Ford SVT Cobra R",
"1999 Ford Racing Puma",
"1995 Ford Mustang SVT Cobra R",
"1993 Ford SVT Cobra R",
"1992 Ford Escort RS Cosworth",
"1992 Ford Falcon GT",
"1991 Ford #15 Roush Racing Whistler Mustang",
"1987 Ford Sierra Cosworth RS500",
"1986 Ford Mustang SVO",
"1986 Ford Escort RS Turbo",
"1982 Ford #6 Zakspeed Roush Mustang IMSA GT",
"1981 Ford #2 Zakspeed Racing Capri Turbo",
"1981 Ford Fiesta XR2",
"1977 Ford Escort RS1800",
"1973 Ford XB Falcon GT",
"1973 Ford Escort RS1600",
"1972 Ford Falcon XA GT-HO",
"1970 Ford #15 Mustang Boss 302 Trans Am",
"1969 Ford Mustang Boss 302",
"1968 Ford Mustang GT 2+2 Fastback",
"1966 Ford #2 GT40 MkII Le Mans",
"1966 Ford Lotus Cortina",
"1965 Ford Mustang GT Coupe",
"1964 Ford GT40 Mk I",
"2020 Formula Drift #91 BMW M2",
"2020 Formula Drift #151 Toyota GR Supra",
"2016 Formula Drift #530 HSV Maloo Gen-F",
"2015 Formula Drift #13 Ford Mustang",
"2006 Formula Drift #43 Dodge Viper SRT10",
"2001 Formula Drift #215 Nissan Silvia Spec-R",
"1995 Formula Drift #34 Toyota Supra MKIV",
"1997 Formula Drift #777 Nissan 240SX",
"1975 Forsberg Racing Nissan ‘Gold Leader’ Datsun 280Z",
"2019 Ginetta #6 Team LNT Ginetta G60-LT-P1",
"2019 Ginetta G55 GT4",
"2019 Ginetta G40 Junior",
"2022 Gordon Murray Automotive T.50",
"2019 Hennessey Camaro Exorcist",
"1985 HDT VK Commodore Group A",
"2017 Holden #22 Walkinshaw Performance VF Commodore",
"2013 Holden #10 Holden Xbox Racing Team Commodore VF",
"1991 Holden HSV Commodore Group A SV",
"1988 Holden VL Commodore Group A SV",
"1977 Holden Torana A9X",
"1973 Holden HQ Monaro GTS 350",
"1968 Holden Monaro GTS 327",
"2025 Honda IndyCar",
"2020 Honda #73 LA Honda World Racing Civic",
"2018 Honda Civic Type R",
"2009 Honda S2000 CR",
"2005 Honda NSX-R",
"2004 Honda Civic Type R",
"2000 Honda Prelude Type SH",
"1997 Honda Civic Type R",
"1992 Honda NSX-R",
"1991 Honda CR-X SiR",
"1970 Honda S800",
"1967 Honda RA300",
"2014 HSV Limited Edition Gen-F GTS Maloo",
"2014 HSV GEN-F GTS",
"2011 HSV GTS",
"1996 HSV GTSR",
"2023 Hyundai IONIQ 5 N",
"2022 Hyundai Elantra N",
"2021 Hyundai #98 Bryan Herta Autosport Elantra N",
"2021 Hyundai i20 N",
"2020 Hyundai i30 N",
"2020 Hyundai #98 Bryan Herta Autosport Veloster N",
"2019 Hyundai Veloster N Forza Edition",
"2019 Hyundai Veloster N",
"2014 Infiniti Q50 Eau Rouge",
"2012 Infiniti IPL G Coupe",
"2003 Infiniti G35 Coupe",
"2015 Jaguar F-TYPE R Coupé",
"2015 Jaguar XKR-S GT",
"2015 Jaguar XFR-S",
"1993 Jaguar XJ220S TWR",
"1993 Jaguar XJ220",
"1991 Jaguar Sport XJR-15",
"1988 Jaguar #1 Jaguar Racing XJR-9",
"1983 Jaguar #44 Group 44 XJR-5",
"1961 Jaguar E-type",
"1959 Jaguar Mk II 3.8",
"1956 Jaguar D-Type",
"2020 Koenigsegg Jesko",
"2017 Koenigsegg Agera RS",
"2015 Koenigsegg One:1",
"2020 KTM X-Bow GT2",
"2018 KTM X-Bow GT4",
"2013 KTM X-Bow R",
"2024 Lamborghini SC63",
"2024 Lamborghini Revuelto",
"2022 Lamborghini Huracán EVO Spyder",
"2021 Lamborghini Countach LPI 800-4",
"2020 Lamborghini Essenza SCV12",
"2020 Lamborghini Huracán STO",
"2020 Lamborghini Huracán EVO",
"2019 Lamborghini Sián FKP 37",
"2018 Lamborghini #63 Squadra Corse Huracán Super Trofeo Evo",
"2018 Lamborghini Aventador SVJ",
"2018 Lamborghini Huracán Performante",
"2016 Lamborghini Centenario LP 770-4",
"2016 Lamborghini Aventador Superveloce",
"2015 Lamborghini #63 Squadra Corse Huracan LP620-2 Super Trofeo",
"2014 Lamborghini Huracán LP 610-4",
"2013 Lamborghini Veneno",
"2012 Lamborghini Aventador J",
"2011 Lamborghini Sesto Elemento",
"2011 Lamborghini Gallardo LP 570-4 Superleggera",
"2010 Lamborghini Murciélago LP 670-4 SV",
"2008 Lamborghini Revénton",
"1999 Lamborghini Diablo GTR",
"1997 Lamborghini Diablo SV",
"1988 Lamborghini Countach LP5000 QV",
"1973 Lamborghini Espada 400 GT",
"1972 Lamborghini Jarama S",
"1967 Lamborghini Miura P400",
"1992 Lancia Delta HF Integrale EVO",
"2021 Lexus LC 500",
"2020 Lexus #14 VASSER SULLIVAN RC F GT3",
"2020 Lexus RC F Track Edition",
"2015 Lexus RC F",
"2014 Lexus IS 350 F Sport",
"2013 Lexus GS350 F Sport",
"2010 Lexus LFA",
"2016 Ligier #11 Euro International JS P3",
"1969 Lola #10 Simoniz Special T163",
"1969 Lola #6 Sunoco T70 MkIIIB",
"2023 Lotus Emira",
"2020 Lotus Evija",
"2018 Lotus Evora GT430",
"2016 Lotus 3-Eleven",
"2011 Lotus Evora S",
"2002 Lotus Esprit V8",
"1986 Lotus #12 Team Lotus 98T",
"1976 Lotus #5 Team Lotus 77",
"1971 Lotus Elan Sprint",
"1967 Lotus Type 49",
"1965 Lotus #1 Team Lotus Type 40",
"1965 Lotus Team Lotus type 35",
"2021 Lynk & Co 03+",
"2020 Lynk & Co #62 Cyan Racing 03",
"2014 Maserati Ghibli S Q4",
"2004 Maserati MC12",
"1997 Maserati Ghibli Cup",
"1961 Maserati Tipo 61 Birdcage",
"1957 Maserati 300 S",
"1953 Maserati A6GCS/53 PininFarina Berlinetta",
"1939 Maserati 8CTF",
"1970 Matra-Simca #146 Equipe Matra-Simca MS650 Tour de France",
"2022 Mazda MX-5 Miata RF",
"2017 Mazda MX-5 Cup",
"2016 Mazda MX-5",
"2015 Mazda Formula Mazda",
"2014 Mazda #70 SpeedSource Lola B12/80",
"2013 Mazda MX-5",
"2011 Mazda RX-8 R3",
"2010 Mazda #16 Mazda Racing B09/86",
"2008 Mazda Furai",
"2002 Mazda RX-7 Spirit R Type-A",
"1997 Mazda RX-7",
"1994 Mazda MX-5 Miata",
"1992 Mazda 323 GT-R",
"1991 Mazda #55 Mazda 787B",
"1991 Mazda #62 RX-7",
"1990 Mazda Savanna RX-7",
"1990 Mazda MX-5 Miata",
"1985 Mazda RX-7 GSL-SE",
"1973 Mazda RX-3",
"1972 Mazda Cosmo 110S Series II",
"2023 McLaren Artura",
"2021 McLaren 765LT Coupe",
"2021 McLaren Sabre",
"2021 McLaren 620R",
"2020 McLaren GT",
"2019 McLaren Senna GTR",
"2019 McLaren #03 720S GT3",
"2019 McLaren 720S Spider",
"2018 McLaren Senna",
"2018 McLaren 720S Coupe",
"2018 McLaren 600LT Coupé",
"2015 McLaren P1 GTR",
"2015 McLaren 650S Coupe",
"2013 McLaren P1",
"1997 McLaren F1 GT",
"1993 McLaren F1",
"1988 McLaren #12 Honda McLaren MP4/4",
"1976 McLaren #11 Team McLaren M23",
"1969 McLaren #4 McLaren Cars M8B",
"1966 McLaren #4 Bruce McLaren Motor Racing M1B",
"1966 McLaren M2B",
"2021 Mercedes-AMG Mercedes-AMG ONE",
"2020 Mercedes-AMG GT Black Series",
"2018 Mercedes-AMG GT3",
"2018 Mercedes-AMG GT 4-Door Coupé",
"2018 Mercedes-AMG E 63 S",
"2017 Mercedes-AMG GT R",
"2016 Mercedes-AMG C 63 S Coupé Forza Edition",
"2016 Mercedes-AMG C 63 S Coupé",
"2017 Mercedes-Benz #33 Mac Tools Ciceley Motorsports A-Class (A45)",
"2013 Mercedes-Benz A 45 AMG",
"2012 Mercedes-Benz C 63 AMG Coupé Black Series",
"2012 Mercedes-Benz SLK 55 AMG",
"2011 Mercedes-Benz SLS AMG",
"2009 Mercedes-Benz SL 65 AMG Black Series",
"2004 Mercedes-Benz C 32 AMG",
"1998 Mercedes-Benz AMG CLK GTR",
"1990 Mercedes-Benz 190E 2.5-16 Evolution II",
"1989 Mercedes-Benz #63 Sauber-Mercedes C 9",
"1955 Mercedes-Benz 300 SLR",
"1954 Mercedes-Benz 300 SL Coupé",
"1939 Mercedes-Benz W154",
"1990 Mercury #15 Whistler Radar Cougar XR-7",
"1970 Mercury Cougar Eliminator",
"1986 Merkur #11 MAC Tools XR4Ti",
"2021 MG MG6 XPower",
"2020 MG #20 MG6 XPower",
"1966 MG MGB GT",
"1958 MG MGA Twin-Cam",
"2021 MINI John Cooper Works GP",
"2012 MINI John Cooper Works GP",
"1965 MINI Cooper S",
"2008 Mitsubishi Lancer Evolution X GSR",
"2006 Mitsubishi Lancer Evolution IX MR",
"2005 Mitsubishi #1 Sierra Sierra Enterprises Lancer Evolution Time Attack",
"2004 Mitsubishi Lancer Evolution VIII MR",
"1999 Mitsubishi Lancer Evolution VI GSR",
"1998 Mitsubishi FTO GP Version R",
"1997 Mitsubishi GTO",
"1995 Mitsubishi Lancer Evolution III GSR",
"1995 Mitsubishi Eclipse GSX",
"1992 Mitsubishi Galant VR-4",
"2016 NIO EP9",
"2024 Nissan Z NISMO",
"2023 Nissan Z",
"2020 Nissan GT-R NISMO (R35)",
"2019 Nissan 370Z Nismo",
"2018 Nissan Sentra NISMO",
"2017 Nissan Altima Racecar",
"2017 Nissan GT-R (R35)",
"2015 Nissan #23 GT-R LM NISMO",
"2003 Nissan Fairlady Z",
"2002 Nissan Skyline GT-R V-Spec II",
"2000 Nissan Silvia Spec-R",
"1999 Nissan #23 NISMO Clarion R391",
"1998 Nissan R390 (GT1)",
"1998 Nissan Silvia K's Aero",
"1998 Nissan #23 Pennzoil NISMO Skyline GT-R",
"1997 Nissan Skyline GT-R V-Spec",
"1994 Nissan Fairlady Z Version S Twin Turbo",
"1994 Nissan Silvia K's",
"1993 Nissan Skyline GT-R V-Spec",
"1993 Nissan 240SX SE",
"1992 Nissan Silvia CLUB K's",
"1991 Nissan #23 Nissan R91CP",
"1990 Nissan Pulsar GTi-R",
"1988 Nissan #24 Nissan Motorsports International R88C",
"1988 Nissan #33 Bob Sharp Racing 300ZX",
"1987 Nissan Skyline GTS-R (HR31)",
"1985 Nissan #83 GTP ZX-Turbo",
"1984 Nissan #20 Bluebird Super Silhouette",
"1984 Nissan #11 Tomica Skyline Turbo Super Silhouette",
"1983 Nissan #23 Nissan Motorsports Silvia Super Silhouette",
"1973 Nissan Skyline H/T 2000GT-R",
"1971 Nissan Skyline 2000GT-R",
"1969 Nissan #21 Nissan Racing R382",
"1969 Nissan Fairlady Z 432",
"1967 Nissan R380 II",
"1990 Oldsmobile #75 Cutlass Supreme Trans Am",
"1969 Oldsmobile Hurst/Olds 442",
"1979 Opel Kadett C GT/E",
"2020 Oreca #38 Performance Tech Motorsports Oreca 07",
"2017 Oreca #38 Jackie Chan DC Racing Oreca 07",
"2022 Pagani Huayra R",
"2016 Pagani Huayra BC",
"2009 Pagani Zonda Cinque Roadster",
"2018 Peugeot #7 DG Sport Compétition 308",
"2011 Peugeot 308 GTI",
"1993 Peugeot #3 Peugeot Talbot Sport 905 EVO 1C",
"1984 Peugeot 205 Turbo 16",
"1971 Plymouth Cuda 426 HEMI",
"1971 Plymouth GTX 426 HEMI",
"2002 Pontiac Firebird Trans Am Ram Air",
"1987 Pontiac Firebird Trans Am GTA",
"1973 Pontiac Firebird Trans Am SD-455",
"1969 Pontiac GTO Judge",
"1969 Pontiac Firebird Trans Am",
"2024 Porsche #5 Porsche Penske Motorsport 963",
"2023 Porsche 911 Turbo S",
"2023 Porsche 911 GT3 R",
"2023 Porsche 911 GT3 RS",
"2022 Porsche 718 Cayman GT4 RS",
"2021 Porsche Mission R",
"2021 Porsche 911 GT3",
"2020 Porsche Taycan Turbo S",
"2019 Porsche #70 Porsche Motorsport 935",
"2019 Porsche 911 GT3 RS",
"2019 Porsche 911 Speedster",
"2019 Porsche 911 Carrera S",
"2018 Porsche 911 GT2 RS Forza Edition",
"2018 Porsche 911 GT2 RS",
"2018 Porsche #73 Park Place Motorsports 911 GT3 R",
"2018 Porsche 718 Cayman GTS",
"2017 Porsche #2 Porsche Team 919 Hybrid",
"2017 Porsche #92 Porsche GT Team 911 RSR",
"2017 Porsche Panamera Turbo",
"2016 Porsche Cayman GT4",
"2016 Porsche 911 GT3 RS",
"2015 Porsche #91 Porsche Team Manthey 991 RSR",
"2015 Porsche Cayman GTS",
"2014 Porsche 918 Spyder",
"2014 Porsche 911 Turbo S",
"2012 Porsche 911 GT2 RS",
"2007 Porsche 911 GT3",
"2004 Porsche 911 GT3",
"2003 Porsche Carrera GT",
"1997 Porsche 911 GT1 Strassenversion",
"1995 Porsche 911 GT2",
"1993 Porsche 911 Turbo S Leichtbau",
"1993 Porsche 968 Turbo S",
"1993 Porsche 928 GTS",
"1989 Porsche 944 Turbo",
"1987 Porsche #203 Porsche AG 961",
"1987 Porsche #17 Porsche AG 962c",
"1987 Porsche 959",
"1983 Porsche #11 John Fitzpatrick Racing 956",
"1982 Porsche 911 Turbo 3.3",
"1981 Porsche #1 Porsche System Engineering 924 GTP Le Mans",
"1980 Porsche 924 Carrera GTS",
"1978 Porsche #78 MOMO 935/78",
"1978 Porsche #43 Porsche Racing 935/78",
"1974 Porsche #1 911 RSR",
"1973 Porsche 911 Carrera RS",
"1971 Porsche #23 917/20",
"1970 Porsche #3 917 LH",
"1970 Porsche 914/6",
"1960 Porsche 718 RS 60",
"1957 Porsche 356A Speedster",
"1955 Porsche 550 Spyder",
"2015 Radical RXC Turbo",
"2019 RAESR Tachyon Speed",
"2018 Renault Megane R.S.",
"2016 Renault Clio R.S. 16 Concept",
"2008 Renault Mégane R26.R",
"2003 Renault Sport Clio V6",
"1993 Renault Clio Williams",
"1980 Renault 5 Turbo",
"1977 Renault #15 Equipe Renault Elf R.S. 01",
"1967 Renault 8 Gordini",
"2021 Rimac Nevera",
"2019 Rimac Concept Two",
"2018 Saleen S302 Black Label",
"2018 Saleen S1",
"2017 Saleen S7 LM",
"2004 Saleen S7",
"1967 Shelby GT 500",
"1965 Shelby Cobra Daytona Coupe",
"1965 Shelby Cobra 427 S/C",
"1963 Shelby Monaco King Cobra",
"2016 Spania GTA GTA Spano",
"2013 SRT Viper GTS",
"2022 SUBARU BRZ",
"2019 SUBARU STI S209 Forza Edition",
"2019 SUBARU STI S209",
"2018 SUBARU #1 Adrian Flux SUBARU Racing Levorg GT",
"2015 SUBARU WRX STI",
"2013 SUBARU BRZ",
"2011 SUBARU WRX STI",
"2008 SUBARU IMPREZA WRX STI",
"2005 SUBARU IMPREZA WRX STi",
"2004 SUBARU IMPREZA WRX STI",
"1998 SUBARU Impreza 22B-STi Version",
"1990 SUBARU LEGACY RS",
"2024 Toyota NASCAR Next Gen Camry XSE",
"2023 Toyota Camry TRD",
"2022 Toyota GR86",
"2021 Toyota GR Yaris",
"2020 Toyota GR Supra",
"2019 Toyota 86 TRD SE",
"2014 Toyota #8 Toyota Racing TS040 HYBRID",
"2003 Toyota Celica Sport Specialty II",
"1999 Toyota #3 Toyota Motorsports GT-ONE TS020",
"1998 Toyota Supra RZ",
"1997 Toyota Mark II Tourer V JZX100",
"1995 Toyota MR2 GT",
"1994 Toyota Celica GT-Four ST205",
"1992 Toyota #99 All American Racers Toyota Eagle MkIII",
"1992 Toyota Celica GT-Four RC ST185",
"1992 Toyota Supra 2.0 GT",
"1989 Toyota MR2 SC",
"1985 Toyota Sprinter Trueno GT Apex",
"1984 Toyota #25 Horsepower Techs Starlet Time Attack",
"1974 Toyota Celica GT",
"1974 Toyota Corolla SR5",
"1969 Toyota 2000GT",
"2018 TVR Griffith",
"2015 Ultima Evolution Coupe 1020",
"2017 Vauxhall #66 Power Maxed TAG Racing Astra",
"2016 Vauxhall Corsa VXR",
"2012 Vauxhall Astra VXR",
"2006 Vauxhall Astra VXR",
"1990 Vauxhall Lotus Carlton",
"2022 Volkswagen Golf R",
"2021 Volkswagen Golf R",
"2018 Volkswagen #22 Experion Racing Golf GTI",
"2014 Volkswagen Golf R",
"2003 Volkswagen Golf R32",
"1998 Volkswagen Gti VR6 Mk3",
"1995 Volkswagen Corrado VR6",
"1992 Volkswagen Golf Gti 16v Mk2",
"1988 Volkswagen Scirocco 16v",
"1983 Volkswagen Golf GTI",
"1981 Volkswagen Scirocco S",
"1997 Volvo 850 R",
"2017 VUHL 05RR",
"2020 Xpeng P7",
"2019 Zenvo TSR-S"

    ],
    tracks: [
      "Bathurst (Mount Panorama Circuit)",
      "Brands Hatch GP",
      "Brands Hatch Indy",
      "Catalunya GP",
      "Catalunya National",
      "Catalunya National Alt",
      "Circuit de Spa",
      "Daytona 24hr Sports Car",
      "Daytona Tri-Oval",
      "Eaglerock Club-R",
      "Eaglerock Oval",
      "Grand Oak Club",
      "Grand Oak National",
      "Grand Oak National-R",
      "Hakone Club",
      "Hakone Club-R",
      "Hakone Grand Prix",
      "Hockenheimring Full",
      "Hockenheimring National",
      "Hockenheimring Short",
      "Homestead Road",
      "Homestead Speedway",
      "Indianapolis Brickyard Oval",
      "Indianapolis GP",
      "Kyalami Grand Prix",
      "Laguna Seca Full",
      "Laguna Seca Short",
      "Le Mans La Sarthe Full",
      "Le Mans Old Mulsanne",
      "Lime Rock Full",
      "Lime Rock Full Alt",
      "Lime Rock South",
      "Maple Valley",
      "Maple Valley Short",
      "Maple Valley Short-R",
      "Mid-Ohio",
      "Mid-Ohio Short",
      "Mugello Club",
      "Mugello Full",
      "Nurburgring Full",
      "Nurburgring GP",
      "Nurburgring Nordschleife",
      "Nurburgring Sprint",
      "Road America",
      "Road America East",
      "Road Atlanta",
      "Road Atlanta Short",
      "Sebring Full",
      "Sebring Short",
      "Silverstone GP",
      "Silverstone International",
      "Silverstone National",
      "Sunset Peninsula Club",
      "Sunset Peninsula Club-R",
      "Sunset Peninsula Full",
      "Sunset Peninsula Full-R",
      "Sunset Peninsula Speedway",
      "Suzuka East",
      "Suzuka Full",
      "VIR Full",
      "VIR Grand East",
      "VIR Grand West",
      "VIR North",
      "VIR South",
      "Watkins Glen Full",
      "Watkins Glen Short",
      "Yas Marina Full",
      "Yas Marina North",
      "Yas Marina North Corkscrew",
      "Yas Marina South"
    ]
  },

  {
    name: "Assetto Corsa",
    vehicles: [
      "Abarth 500 Assetto Corse",
      "Abarth 500 EsseEsse",
      "Abarth 500 EsseEsse Step 1",
      "Abarth 595 SS",
      "Abarth 595 SS Step 1",
      "Abarth 595 SS Step 2",
      "Alfa Romeo 33 Stradale",
      "Alfa Romeo 4C",
      "Alfa Romeo 155 Ti V6",
      "Alfa Romeo GTA",
      "Alfa Romeo Giulia Quadrifoglio",
      "Alfa Romeo Giulietta QV",
      "Alfa Romeo Giulietta QV Launch Edition 2014",
      "Alfa Romeo Mito QV",
      "Audi R8 LMS Ultra",
      "Audi R18 e-tron Quattro",
      "Audi R8 LMS 2016",
      "Audi Sport Quattro",
      "Audi Sport Quattro S1 E2",
      "Audi Sport Quattro Step 1",
      "Audi TT Cup",
      "Audi TT RS VLN",
      "BMW 1M Coupe",
      "BMW 1M Coupe Stage 3",
      "BMW M3 E30",
      "BMW M3 E30 Drift",
      "BMW M3 E30 Group A 92",
      "BMW M3 E30 Group A",
      "BMW M3 E30 Step 1",
      "BMW M3 E92",
      "BMW M3 E92 Step 1",
      "BMW M3 E92 Drift",
      "BMW M3 GT2",
      "BMW M4 Coupe Akrapovic Edition",
      "BMW M4 Coupe",
      "BMW Z4 E89 35is",
      "BMW Z4 E89 Drift",
      "BMW Z4 E89 Step 1",
      "BMW Z4 GT3",
      "Chevrolet Corvette C7R",
      "Ferrari 312T",
      "Ferrari 458 GT2",
      "Ferrari 458 Italia",
      "Ferrari 458 Italia Stage 3",
      "Ferrari 599XX Evo",
      "Ferrari F40",
      "Ferrari F40 Stage 3",
      "Ferrari FXX K",
      "Ferrari LaFerrari",
      "Ferrari SF 15-T",
      "Ferrari F138",
      "Ferrari 488 GT3",
      "Ferrari FXX K",
      "Ferrari 488 GTB",
      "Ford Escort RS 1600",
      "Ford GT40",
      "Ford Focus RS 1600",
      "Ford GT40 MKI",
      "KTM X-Bow R",
      "Lamborghini Countach",
      "Lamborghini Countach S1",
      "Lamborghini Gallardo Superleggera Step 3",
      "Lamborghini Huracan GT3",
      "Lamborghini Huracan Performante",
      "Lamborghini Huracan Super Trofeo",
      "Lamborghini Miura",
      "Lamborghini Sesto Elemento",
      "Lotus 2-Eleven",
      "Lotus 2-Eleven GT4",
      "Lotus Elise SC",
      "Lotus Elise SC Step 1",
      "Lotus Elise SC Step 2",
      "Lotus Evora GTC",
      "Lotus Evora GTE",
      "Lotus Evora GTE Carbon",
      "Lotus Evora GX",
      "Lotus Evora S",
      "Lotus Evora S Stage 2",
      "Lotus Exige 240R",
      "Lotus Exige 240R Stage 3",
      "Lotus Exige S",
      "Lotus Exige S Roadster",
      "Lotus Exige Scura",
      "Lotus Exige V6 CUP",
      "Lotus Exos T125",
      "Lotus Exos T125 Stage 1",
      "Lotus Type 25",
      "Lotus Type 72D",
      "Lotus Classics",
      "Lotus Type 49",
      "Lotus Type 98T",
      "Maserati Alfieri",
      "Maserati Levante S",
      "Maserati Quattroporte GTS",
      "Maserati 250F 6C",
      "Maserati 250F T2 12C",
      "Maserati GranTurismo MC GT4",
      "Mazda 787B",
      "Mazda MX-5 Miata NA",
      "Mazda MX-5 ND",
      "Mazda MX-5 Cup",
      "Mazda RX-7 Spirit R",
      "Mazda RX-7 Spirit R Tuned",
      "McLaren 650S GT3",
      "McLaren F1 GTR",
      "McLaren MP4-12C",
      "McLaren MP4-12C GT3",
      "McLaren P1",
      "McLaren P1 GTR",
      "McLaren 570S",
      "Mercedes-Benz SLS AMG",
      "Mercedes-Benz SLS AMG GT3",
      "Mercedes-Benz 190E Evo II",
      "Mercedes-Benz AMG GT3",
      "Mercedes-Benz C9 1989 LM",
      "Nissan GT-R NISMO GT3",
      "Nissan 370Z NISMO",
      "Nissan R34 GT-R Skyline V-Spec",
      "Pagani Huayra",
      "Pagani Huayra BC",
      "Pagani Zonda R",
      "Porsche Cayenne Turbo S",
      "Porsche Macan Turbo",
      "Porsche Panamera G2",
      "Porsche 935 78 Moby Dick",
      "Porsche 991 Carrera S",
      "Porsche 918 Spyder",
      "Porsche 911 Carrera RSR",
      "Porsche 718 Cayman S",
      "Porsche 917/30 Spyder",
      "Porsche 935/78 ‘Moby Dick’",
      "Porsche Cayman GT4 Clubsport",
      "Porsche 911 GT3 RS",
      "Porsche 718 RS 60 Spyder",
      "Porsche Cayman GT4",
      "Porsche 718 Boxster S",
      "Porsche 718 Boxster S PDK",
      "Porsche 919 Hybrid 2015",
      "Porsche 911 GT1",
      "Porsche 962C LT (Long Tail)",
      "Porsche 962 C ST (Short Tail)",
      "Porsche 911 RSR 2017",
      "Porsche 911 GT3 Cup 2017",
      "Porsche 911 GT3 R 2016",
      "Porsche 919 Hybrid 2016",
      "Porsche 908 LH",
      "Porsche 917 K",
      "Porsche 911 R",
      "Porsche 911 Turbo S 991",
      "Praga R1",
      "RUF CTR Yellowbird",
      "RUF RT 12R",
      "RUF RT 12R AWD",
      "Scuderia Glickenhaus P4/5 Competizione",
      "Scuderia Glickenhaus SCG003",
      "Shelby Cobra 427 S/C",
      "Tatuus FA01",
      "Toyota Supra MK IV",
      "Toyota Supra MK IV Drift",
      "Toyota MK IV Time Attack",
      "Toyota AE86",
      "Toyota AE86 Drift",
      "Toyota AE86 Tuned",
      "Toyota Celica ST185",
      "Toyota TS040 Hybrid"
    ],
    tracks: [
      "Autodromo dell’Umbria – Magione",
      "Autodromo Internazionale del Mugello",
      "Autodromo Internazionale Enzo e Dino Ferrari – Imola",
      "Autodromo Nazionale di Monza",
      "Autodromo Piero Taruffi – Vallelunga",
      "Black Cat County",
      "Brands Hatch",
      "Circuit de Barcelona-Catalunya – Barcelona",
      "Circuit Park Zandvoort",
      "Circuit de Spa-Francorchamps",
      "Drag Strip",
      "Drift",
      "Highlands",
      "Laguna Seca",
      "Nürburgring",
      "Nürburgring Nordschleife",
      "Red Bull Ring",
      "Silverstone Circuit",
      "Trento-Bondone Hill Climb"
    ]
  },

  {
    name: "Assetto Corsa Competizione",
    vehicles: [
      "1926 Bugatti Type 35 C",
      "1929 Mercedes-Benz SSK",
      "1930 Bentley 8 Litre",
      "1930 Bentley Blower 4-1/2 Litre Supercharged",
      "1939 Auto Union Type D",
      "1939 Maserati 8CTF",
      "1939 Mercedes-Benz W154",
      "1954 Mercedes-Benz 300 SL Coupe",
      "1955 Mercedes-Benz 300 SLR",
      "1957 BMW Isetta 300 Export",
      "1958 Aston Martin DBR1",
      "1958 Austin-Healey Sprite MkI",
      "1962 Lincoln Continental",
      "1964 Aston Martin DB5",
      "1965 Alfa Romeo Giulia Sprint GTA Stradale",
      "1965 Alfa Romeo Giulia TZ2",
      "1965 MINI Cooper S",
      "1965 MINI Cooper S Forza Edition",
      "1967 Lamborghini Miura P400",
      "1967 Mercedes-Benz 280 SL",
      "1968 Abarth 595 esseesse",
      "1968 Alfa Romeo 33 Stradale",
      "1968 Lancia Fulvia Coupe Rallye 1.6 HF",
      "1970 AMC Rebel The Machine",
      "1970 Buick GSX",
      "1970 Mercury Cyclone Spoiler",
      "1971 AMC Javelin AMX",
      "1971 Lotus Elan Sprint",
      "1972 Land Rover Series III",
      "1973 Alpine A110 1600s",
      "1973 AMC Gremlin X",
      "1973 BMW 2002 Turbo",
      "1973 Lamborghini Espada 400 GT",
      "1973 Land Rover Range Rover",
      "1974 Lancia Stratos HF Stradale",
      "1979 Chevrolet Camaro Z28",
      "1980 Abarth Fiat 131",
      "1980 Lotus Esprit Turbo",
      "1981 BMW M1",
      "1983 Audi Sport quattro",
      "1986 Audi #2 Audi Sport quattro S1",
      "1986 BMW M635CSi",
      "1986 Lamborghini LM 002",
      "1986 Lancia Delta S4",
      "1986 MG Metro 6R4",
      "1987 Buick Regal GNX",
      "1987 Mercedes-Benz AMG Hammer Coupe",
      "1987 Mercedes-Benz AMG Hammer Wagon",
      "1988 BMW M5",
      "1988 Chevrolet Monte Carlo Super Sport",
      "1988 Lamborghini Countach LP5000 QV",
      "1990 Aston Martin Lagonda",
      "1990 Mazda Savanna RX-7",
      "1990 Mercedes-Benz 190E 2.5-16 Evolution II",
      "1991 Bentley Turbo R",
      "1991 BMW M3",
      "1991 BMW X5 M",
      "1992 Alfa Romeo 155 Q4",
      "1992 Bugatti EB110 Super Sport",
      "1992 Lancia Delta HF Integrale EVO",
      "1992 Mazda 323 GT-R",
      "1992 Mercedes-Benz 500 E",
      "1993 Autozam AZ-1",
      "1993 McLaren F1",
      "1994 Mazda MX-5 Miata",
      "1995 Audi Avant RS 2",
      "1995 BMW 850CSi",
      "1995 BMW M5",
      "1995 Chevrolet Corvette ZR-1",
      "1995 Mitsubishi Lancer Evolution III GSR",
      "1996 Chevrolet Impala Super Sport",
      "1997 BMW M3",
      "1997 Lamborghini Diablo SV",
      "1997 Lexus SC300",
      "1997 Lotus Elise GT1",
      "1997 FD #777 240SX",
      "1997 McLaren F1 GT",
      "1997 Mazda RX-7",
      "1997 Mitsubishi GTO",
      "1997 Mitsubishi Montero Evolution",
      "1998 Mercedes-Benz AMG CLK GTR",
      "1998 Mercedes-Benz AMG CLK GTR Forza Edition",
      "1998 Mitsubishi FTO GP Version R",
      "1999 Lamborghini Diablo GTR",
      "1999 Lotus Elise Series 1 Sport 190",
      "1999 Mitsubishi Lancer Evolution VI GSR",
      "2000 Lotus 340R",
      "2001 Acura Integra Type-R",
      "2001 Audi RS 4 Avant",
      "2002 Acura RSX Type-S",
      "2002 BMW M3-GTR",
      "2002 BMW Z3 M Coupe",
      "2002 Chevrolet Corvette Z06",
      "2002 Lotus Esprit V8",
      "2002 Mazda RX-7 Spirit R Type-A",
      "2003 Audi RS 6",
      "2003 BMW M5",
      "2004 Mitsubishi Lancer Evolution VIII MR",
      "2005 BMW M3",
      "2005 Mazda Mazdaspeed MX-5",
      "2005 MG XPower SV-R",
      "2005 Mitsubishi #1 Sierra Sierra Enterprises Lancer Evolution Time Attack",
      "2006 Audi RS 4",
      "2006 Mercedes-Benz E 55 AMG Wagon",
      "2006 Mitsubishi Lancer Evolution IX MR",
      "2007 Alfa Romeo 8C Competizione",
      "2008 Aston Martin DBS",
      "2008 BMW M3",
      "2008 BMW Z4 M Coupe",
      "2008 Lamborghini Reventon",
      "2008 Lotus 2-Eleven",
      "2008 MINI John Cooper Works Countryman ALL4",
      "2008 MINI X-Raid John Cooper Works Buggy",
      "2008 Mitsubishi Lancer Evolution X GSR",
      "2023 Aston Martin Valkyrie",
      "2023 BMW M2",
      "2023 Chevrolet Corvette Z06",
      "2023 Dodge Charger SRT Hellcat",
      "2023 Ferrari 296 GTB",
      "2023 Ford F-150 Raptor R",
      "2023 Lamborghini Revuelto",
      "2023 McLaren Solus GT",
      "2023 Nissan Z",
      "2023 Pagani Utopia",
      "2023 Porsche 911 Dakar",
      "2023 Toyota GR86",
      "2024 Alfa Romeo Tonale",
      "2024 Audi RS Q8",
      "2024 BMW i4 M50",
      "2024 Cadillac Lyriq",
      "2024 Chevrolet Silverado EV",
      "2024 Dodge Ram 1500 REV",
      "2024 Ferrari Purosangue",
      "2024 Ford Mustang Mach-E GT"
    ],
    tracks: [
      "24H Nürburgring (Nordschleife)",
      "Autodromo Internazionale Enzo e Dino Ferrari – Imola",
      "Barcelona",
      "Brands Hatch",
      "Circuit of the Americas (COTA)",
      "Circuit Ricardo Tormo (Valencia)",
      "Donington Park",
      "Hungaroring",
      "Indianapolis",
      "Kyalami Grand Prix Circuit",
      "Misano",
      "Monza",
      "Mount Panorama Circuit",
      "Nürburgring",
      "Oulton Park",
      "Paul Ricard",
      "Red Bull Ring",
      "Snetterton",
      "Silverstone",
      "Spa-Francochamps",
      "Suzuka Circuit",
      "Watkins Glen",
      "Weathertech Raceway Laguna Seca",
      "Zandvoort",
      "Zolder"
    ]
  },

  { name: "Gran Turismo 7", vehicles: ["1500 Biposto Bertone B.A.T 1 '52",
    "155 2.5 V6 TI '93",
    "180SX Type X '96",
    "190 E 2.5-16 Evolution II '91",
    "2&4 powered by RC213V",
    "2000GT '67",
    "2008 Allure '21",
    "205 GTI '88",
    "205 Turbo 16 Evolution 2 '86",
    "208 GTi by Peugeot Sport '14",
    "240 SE Estate '93",
    "250 GT Berlinetta passo corto '61",
    "250 GTO '62",
    "296 GT3 '23",
    "296 GTB '22",
    "2J '70",
    "3.0 CSL '71",
    "3.0 CSL '73",
    "300 SEL 6.8 AMG '71",
    "300 SL (W194) '52",
    "300 SL Coupé '54",
    "308 GTB '75",
    "330 P4 '67",
    "356 A/1500 GS Carrera '56",
    "356 A/1500 GS GT Carrera Speedster '56",
    "365 GTB4 '71",
    "400R '95",
    "430 Scuderia '07",
    "458 Italia '09",
    "458 Italia Gr.4",
    "458 Italia GT3 '13",
    "4C '14",
    "4C Gr.3",
    "4C Gr.3 Road Car",
    "4C Gr.4",
    "500 1.2 8V Lounge SS '08",
    "500 F '68",
    "500 Mondial Pinin Farina Coupe '54",
    "512 BB '76",
    "650S '14",
    "650S Gr.4",
    "650S GT3 '15",
    "787B '91",
    "812 Superfast '17",
    "86 Gr.4",
    "86 Gr.B Rally Car",
    "86 GRMN '16",
    "86 GT '15",
    "86 GT\"Limited\" '16",
    "8C 2900B Touring Berlinetta '38",
    "8C Competizione '08",
    "908 HDi FAP '10",
    "911 Carrera RS (901) '73",
    "911 Carrera RS (964) '92",
    "911 Carrera RS (993) '95",
    "911 Carrera RS CS (993) '95",
    "911 GT1 Strassenversion '97",
    "911 GT3 (996) '01",
    "911 GT3 (997) '09",
    "911 GT3 R (992) '22",
    "911 GT3 RS (991) '16",
    "911 GT3 RS (992) '22",
    "911 RSR (991) '17",
    "911 Turbo (930) '81",
    "911 Turbo S (992) '20",
    "917 LIVING LEGEND",
    "917K '70",
    "918 Spyder '13",
    "919 Hybrid '16",
    "959 '87",
    "962 C '88",
    "A 45 AMG '13",
    "A110 '17",
    "A110 '72",
    "A112 Abarth '85",
    "A220 Race Car '68",
    "A6GCS/53 Spyder '54",
    "Abarth 500 '09",
    "Abarth 595 SS '70",
    "AFEELA 1 '26",
    "AFEELA Prototype 2024",
    "Alphard Executive Lounge '18",
    "Alpine VGT",
    "Alpine VGT '17",
    "Alpine VGT Race",
    "Amuse NISMO 380RS Super Leggera",
    "Amuse S2000 GT1 Turbo",
    "Aqua S '11",
    "Atenza Gr.3",
    "Atenza Gr.3 Road Car",
    "Atenza Gr.4",
    "Atenza Sedan XD L Package '15",
    "Audi e-tron VGT",
    "Audi VGT",
    "Avantime 3.0 V6 24V '02",
    "Aventador LP 700-4 '11",
    "Aventador LP 750-4 SV '15",
    "Beat '91",
    "Beetle Gr.3",
    "BMW VGT",
    "BNR34 GT-R N1 base",
    "BRZ Drift Car '17",
    "BRZ GT300 '21",
    "BRZ S '15",
    "BRZ S '21",
    "BRZ STI Sport '18",
    "Bugatti VGT",
    "Bugatti VGT (Gr.1)",
    "BVLGARI Aluminium VGT",
    "BX 19 TRS '87",
    "C-HR S '18",
    "Camaro 1969 Race-Mod",
    "Camaro SS '16",
    "Camaro Z28 '69",
    "Camaro ZL1 1LE Package '18",
    "Cappuccino '91",
    "Captur S Edition '21",
    "Carrera GT '04",
    "Carrera GTS (904) '64",
    "Carry KC '12",
    "Cayman GT4 '16",
    "Cayman GT4 Clubsport '16",
    "Celica GT-FOUR (ST205) '94",
    "Celica GT-FOUR Rally Car (ST205) '95",
    "Challenger R/T '70",
    "Challenger SRT Demon '18",
    "Chaparral 2X VGT",
    "Charger R/T 426 Hemi '68",
    "Charger SRT Hellcat '15",
    "Charger SRT Hellcat Safety Car",
    "CHC 1967 Chevy Nova",
    "Chevelle SS 454 '70",
    "Chiron '16",
    "Civic Si Extra (EF) '87",
    "Civic SiR･II (EG) '93",
    "Civic Type R (EK) '97",
    "Civic Type R (EK) '98",
    "Civic Type R (EK) Touring Car",
    "Civic Type R (FK2) '15",
    "Civic Type R (FL5) '22",
    "Civic Type R Limited Edition (FK8) '20",
    "Clio R.S. 220 Trophy '15",
    "Clio R.S. 220 Trophy '16",
    "Clio V6 24V '00",
    "CLK-LM '98",
    "Cobra 427 '66",
    "Cobra Daytona Coupe '64",
    "Concept XR-PHEV EVOLUTION VGT",
    "Copen '02",
    "COPEN RJ VGT",
    "Corolla Levin 1600GT APEX (AE86) '83",
    "Corvette (C1) '58",
    "Corvette (C2) '63",
    "Corvette C7 '14",
    "Corvette C7 Gr.3",
    "Corvette C7 Gr.3 Road Car",
    "Corvette C7 Gr.4",
    "Corvette C7 ZR1 '19",
    "Corvette C8 '20",
    "Corvette Convertible (C3) '69",
    "Corvette CX Concept '25",
    "Corvette CX.R VGT Concept",
    "Corvette Stingray (C3) '69",
    "Corvette Stingray Racer Concept '59",
    "Corvette Z06 (C5) '01",
    "Corvette ZR-1 (C4) '89",
    "Corvette ZR1 (C6) '09",
    "Countach 25th Anniversary '88",
    "Countach LP400 '74",
    "CR-V e:HEV EX・Black Edition '21",
    "Crown Athlete G '13",
    "Crown Athlete G Safety Car",
    "CTR3 '07",
    "CX-30 X Smart Edition '21",
    "D-type '54",
    "DB11 '16",
    "DB3S '53",
    "DB5 '64",
    "DBR9 GT1 '10",
    "DeLorean S2 '04",
    "Delta HF Integrale Evoluzione '91",
    "Delta HF Integrale Rally Car '92",
    "Demio XD Touring '15",
    "Diablo GT '00",
    "Dino 246 GT '71",
    "DP-100 VGT",
    "DS 21 Pallas '70",
    "DS 3 Racing '11",
    "E-type Coupé '61",
    "ELANTRA N '23",
    "ELANTRA N TC '24",
    "Enzo Ferrari '02",
    "Escort RS Cosworth '92",
    "Espace F1 '95",
    "Eunos Roadster (NA) '89",
    "F-150 SVT Raptor '11",
    "F-type Gr.3",
    "F-type Gr.4",
    "F-type R '14",
    "F12berlinetta '12",
    "F1500T-A",
    "F3500-A",
    "F3500-B",
    "F40 '92",
    "F430 '06",
    "F50 '95",
    "F8 Tributo '19",
    "Fairlady 240ZG (HS30) '71",
    "Fairlady Z (Z34) '08",
    "Fairlady Z 300ZX TT 2seater '89",
    "Fairlady Z 432 '69",
    "Fairlady Z Version S (Z33) '07",
    "Ferrari VGT",
    "Firebird Trans Am '78",
    "Fit Hybrid '14",
    "Focus Gr.B Rally Car",
    "Focus RS '18",
    "Focus ST '15",
    "Ford GT '06",
    "Ford GT '17",
    "Ford GT LM Race Car Spec II",
    "Ford GT LM Spec II Test Car",
    "Ford GT Race Car '18",
    "Ford Roadster",
    "FT-1",
    "FT-1 VGT",
    "FT-1 VGT (Gr.3)",
    "FTO GP Version R '97",
    "FXX K '14",
    "G.T.350 '65",
    "G70 3.3T AWD P.Package '22",
    "G70 GR4",
    "GAC Maverick",
    "Gallardo LP 560-4 '08",
    "Garage RCR Civic",
    "Genesis Coupe 3.8 '13",
    "Genesis Gr.3",
    "Genesis Gr.4",
    "Genesis Gr.B Rally Car",
    "Genesis X GR3",
    "Genesis X Gran Berlinetta VGT Concept",
    "Genesis X Gran Racer VGT Concept",
    "Giulia GTAm '20",
    "Giulia Sprint GT Veloce '67",
    "GIULIA TZ2 carrozzata da ZAGATO '65",
    "Golf I GTI '83",
    "Golf VII GTI '14",
    "GR Corolla MORIZO Edition '22",
    "GR Supra Race Car '19",
    "GR Supra Racing Concept '18",
    "GR Supra RZ '19",
    "GR Supra RZ '20",
    "GR Yaris RZ \"High performance\" '20",
    "GR010 HYBRID '21",
    "GR86 RZ '21",
    "GranTurismo S '08",
    "GReddy Fugu Z",
    "GT by Citroën Gr.4",
    "GT by Citroën Race Car (Gr.3)",
    "GT by Citroën Road Car",
    "GT-One (TS020) '99",
    "GT-R '17",
    "GT-R Gr.4",
    "GT-R Gr.B Rally Car",
    "GT-R GT500 '08",
    "GT-R GT500 '99",
    "GT-R LM NISMO '15",
    "GT-R NISMO '17",
    "GT-R NISMO GT3 '13",
    "GT-R NISMO GT3 '18",
    "GT-R NISMO GT500 '16",
    "GT-R Premium edition T-spec '24",
    "GT-R Safety Car",
    "GT40 Mark I '66",
    "GTI Roadster VGT",
    "GTI Supersport VGT",
    "GTO '84",
    "GTO 'The Judge' '69",
    "GTO Twin Turbo '91",
    "Hiace Van DX '16",
    "Himedic '21",
    "Honda Sports VGT",
    "Huayra '13",
    "Huracán Gr.4",
    "Huracán GT3 '15",
    "Huracán LP 610-4 '15",
    "HYUNDAI N 2025 VGT",
    "HYUNDAI N 2025 VGT (Gr.1)",
    "i3 '15",
    "ID.R '19",
    "Impreza 22B-STi '98",
    "Impreza Coupe WRX Type R STi Ver.VI '99",
    "Impreza Rally Car '98",
    "Impreza Sedan WRX STi '04",
    "INFINITI CONCEPT VGT",
    "Integra Type R (DC2) '95",
    "Integra Type R (DC2) '98",
    "IONIQ 5 N '24",
    "IsoRivolta Zagato VGT",
    "Italdesign VGT Off-road Mode",
    "Italdesign VGT Street Mode",
    "Jaguar VGT Coupé",
    "Jaguar VGT Roadster",
    "Jaguar VGT SV",
    "Jimny Sierra JC '18",
    "Jimny XC '18",
    "Kangoo 1.4 '01",
    "L500R HYbrid VGT 2017",
    "L750R HYbrid VGT 2017",
    "LaFerrari '13",
    "Lambo V12 VGT",
    "Lancer Evolution Final '15",
    "Lancer Evolution Final Gr.3",
    "Lancer Evolution Final Gr.4",
    "Lancer Evolution Final Gr.B Rally Car",
    "Lancer Evolution Final Gr.B Road Car",
    "Lancer Evolution III GSR '95",
    "Lancer Evolution IV GSR '96",
    "Lancer Evolution IX MR GSR '06",
    "Lancer Evolution V GSR '98",
    "Lancer Evolution VI GSR T.M. SCP '99",
    "Lancer Evolution VIII MR GSR '04",
    "Land Cruiser FJ40V '74",
    "LC500 '17",
    "LF-LC GT VGT",
    "LFA '10",
    "LM55 VGT",
    "LM55 VGT (Gr.1)",
    "M2 Competition '18",
    "M3 '03",
    "M3 '07",
    "M3 '89",
    "M3 '97",
    "M3 GT '11",
    "M3 Sport Evolution '89",
    "M4 '14",
    "M4 Gr.4",
    "M4 Safety Car",
    "M6 GT3 Endurance Model '16",
    "M6 GT3 Sprint Model '16",
    "Mach Forty",
    "Mangusta '69",
    "Mark IV Race Car '67",
    "MAZDA SPIRIT RACING ROADSTER 12R '25",
    "MAZDA3 '19",
    "MAZDA3 Gr.4",
    "MC20 '20",
    "McLaren F1 '94",
    "McLaren F1 GTR - BMW '95",
    "McLaren F1 GTR Race Car '97",
    "McLaren P1 GTR '16",
    "McLaren VGT",
    "McLaren VGT (Gr.1)",
    "Merak SS '80",
    "Mercedes-AMG C 63 S '15",
    "Mercedes-AMG GT Black Series '20",
    "Mercedes-AMG GT R '17",
    "Mercedes-AMG GT S '15",
    "Mercedes-AMG GT Safety Car",
    "Mercedes-AMG GT3 '16",
    "Mercedes-AMG GT3 '20",
    "Mercedes-Benz AMG VGT",
    "Mercedes-Benz AMG VGT Racing Series",
    "MINI Clubman VGT",
    "MINI Cooper S '05",
    "Mini-Cooper 'S' '65",
    "Mission X '23",
    "MiTo '09",
    "Miura P400 Bertone Prototype '67",
    "Model 3 Performance '23",
    "Model S Signature Performance '12",
    "Mono '16",
    "MP4-12C '10",
    "MP4/4 '88",
    "MR2 GT-S '97",
    "Murciélago LP 640 '09",
    "Mustang Boss 429 '69",
    "Mustang Gr.3",
    "Mustang Gr.3 Road Car",
    "Mustang Gr.4",
    "Mustang Gr.B Rally Car",
    "Mustang GT '15",
    "Mustang Mach 1 '71",
    "Mégane Gr.4",
    "Mégane R.S. Trophy '11",
    "Mégane R.S. Trophy Safety Car",
    "Mégane Trophy '11",
    "N-ONE RS '22",
    "NISSAN CONCEPT 2020 VGT",
    "NSX '17",
    "NSX CONCEPT-GT '16",
    "NSX Gr.3",
    "NSX Gr.4",
    "NSX Gr.B Rally Car",
    "NSX GT500 '00",
    "NSX GT500 '08",
    "NSX Type R '02",
    "NSX Type R '92",
    "One-77 '11",
    "Opel Corsa GSE VGT",
    "Panda 30 CL '85",
    "Pantera '71",
    "PEUGEOT VGT",
    "PEUGEOT VGT (Gr.3)",
    "Polestar 5 Performance '26",
    "Polo GTI '14",
    "Porsche VGT",
    "Porsche VGT Spyder",
    "Prius G '09",
    "Qashqai Tekna e-Power '22",
    "R.S.01 '16",
    "R.S.01 GT3 '16",
    "R18 '16",
    "R18 TDI '11",
    "R32 GT-R NISMO '90",
    "R32 GT-R V･spec II '94",
    "R33 GT-R V･spec '97",
    "R34 GT-R V･spec II Nür '02",
    "R34 GT-R Z-tune '05",
    "R4 GTL '85",
    "R5 Turbo '80",
    "R8 4.2 '07",
    "R8 Coupé V10 plus '16",
    "R8 Gordini '66",
    "R8 LMS '15",
    "R8 LMS Evo '19",
    "R92CP '92",
    "RA272 '65",
    "Racing Kart 125 Shifter",
    "RAV4 Adventure '20",
    "RC F '14",
    "RC F Gr.4",
    "RC F GT3 '17",
    "RC F GT3 prototype '16",
    "RC F GT500 '16",
    "RCZ Gr.3",
    "RCZ Gr.3 Road Car",
    "RCZ Gr.4",
    "RCZ Gr.B Rally Car",
    "RCZ GT Line '15",
    "RE Amemiya FD3S RX-7",
    "Red Bull X2014 Junior",
    "Red Bull X2014 Standard",
    "Red Bull X2019 Competition",
    "RGT 4.2 '16",
    "Roadster NR-A (ND) '22",
    "Roadster S (ND) '15",
    "Roadster Shop Rampage",
    "Roadster Touring Car",
    "RS 5 Turbo DTM '19",
    "RX-7 GT-X (FC) '90",
    "RX-7 Spirit R Type A (FD) '02",
    "RX-8 Spirit R '12",
    "RX-VISION '15",
    "RX-VISION GT3 CONCEPT",
    "RX500 '70",
    "S Barker Tourer '29",
    "S-FR '15",
    "S-FR Racing Concept '16",
    "S2000 '99",
    "S660 '15",
    "S800 '66",
    "Sambabus Typ 2 '62",
    "Sauber Mercedes C9 '89",
    "SC430 GT500 '08",
    "Scirocco Gr.4",
    "Scirocco R '10",
    "SF19 Super Formula / Honda '19",
    "SF19 Super Formula / Toyota '19",
    "SF23 Super Formula/Honda '23",
    "SF23 Super Formula/Toyota '23",
    "Shelby GT350R '16",
    "Sierra RS 500 Cosworth '87",
    "Sileighty '98",
    "Silvia K's Aero (S14) '96",
    "Silvia K's Dia Selection (S13) '90",
    "Silvia K's Type S (S14) '94",
    "Silvia Q's (S13) '88",
    "Silvia spec-R Aero (S15) '02",
    "Silvia spec-R Aero (S15) Touring Car",
    "Skyline 2000GT-R (KPGC110) '73",
    "Skyline GTS-R (R31) '87",
    "Skyline Hard Top 2000GT-R (KPGC10) '70",
    "Skyline Super Silhouette '84",
    "SLR McLaren '09",
    "SLS AMG '10",
    "SLS AMG Gr.4",
    "SLS AMG GT3 '11",
    "Sport quattro S1 Pikes Peak '87",
    "Sports 800 '65",
    "Sprinter Trueno 1600GT APEX (AE86) '83",
    "Sprinter Trueno 1600GT APEX (S.Shigeno Version)",
    "Spyder type 550/1500RS '55",
    "SR3 SL '13",
    "SRT Tomahawk GTS-R VGT",
    "SRT Tomahawk S VGT",
    "SRT Tomahawk VGT (Gr.1)",
    "SRT Tomahawk X VGT",
    "Stratos '73",
    "SU7 Ultra '25",
    "Super Bee '70",
    "Superbird '70",
    "Supra 3.0GT Turbo A '88",
    "Supra GT500 '97",
    "Supra RZ '97",
    "SUZUKI VGT",
    "SUZUKI VGT (Gr.3)",
    "Swift Sport '07",
    "Swift Sport '17",
    "Swift Sport Gr.4",
    "Taycan Turbo S '19",
    "Testarossa '91",
    "TS030 Hybrid '12",
    "TS050 - Hybrid '16",
    "TT Coupé 3.2 quattro '03",
    "TT Cup '16",
    "TTS Coupé '09",
    "TTS Coupé '14",
    "Tundra TRD Pro '19",
    "Tuscan Speed 6 '00",
    "Unimog Type 411 '62",
    "Urus '18",
    "V12 Vantage GT3 '12",
    "V40 T5 R-Design '13",
    "V6 Escudo Pikes Peak Special '98",
    "V8 Vantage Gr.4",
    "V8 Vantage S '15",
    "Valkyrie '21",
    "Vantage '18",
    "Veneno '14",
    "Veyron 16.4 '13",
    "Veyron Gr.4",
    "Viper Gr.4",
    "Viper GTS '02",
    "Viper GTS '13",
    "Viper SRT GT3-R '15",
    "Viper SRT10 Coupe '06",
    "VIZIV GT VGT",
    "Volkswagen 1200 '66",
    "Volkswagen GTI VGT (Gr.3)",
    "Vulcan '16",
    "W 196 R '55",
    "Wicked Fabrication GT 51",
    "Willys MB '45",
    "WRX Gr.3",
    "WRX Gr.4",
    "WRX Gr.B Rally Car",
    "WRX Gr.B Road Car",
    "WRX STI Isle of Man '16",
    "WRX STI Type S '14",
    "X-BOW R '12",
    "XJ13 '66",
    "XJ220 '92",
    "XJR-9 '88",
    "XNR Ghia Roadster '60",
    "Z Performance '23",
    "Z4 3.0i '03",
    "Z4 GT3 '11",
    "Z8 '01",
    "Zonda R '09",
    "Škoda VGT",
    "ɛ̃fini RX-7 Type R (FD) '91"], tracks: [
      "24 Heures du Mans Racing Circuit",
"24 Heures du Mans Racing Circuit No Chicane",
"Alsace - Test Course",
"Alsace - Test Course Reverse",
"Alsace - Village",
"Alsace - Village Reverse",
"Autodrome Lago Maggiore - Centre",
"Autodrome Lago Maggiore - Centre Reverse",
"Autodrome Lago Maggiore - East",
"Autodrome Lago Maggiore - East End",
"Autodrome Lago Maggiore - East End Reverse",
"Autodrome Lago Maggiore - East Reverse",
"Autodrome Lago Maggiore - Full Course",
"Autodrome Lago Maggiore - Full Course Reverse",
"Autodrome Lago Maggiore - West",
"Autodrome Lago Maggiore - West End",
"Autodrome Lago Maggiore - West End Reverse",
"Autodrome Lago Maggiore - West Reverse",
"Autodromo Nazionale Monza",
"Autodromo Nazionale Monza No Chicane",
"Autódromo de Interlagos",
"Autopolis International Racing Course",
"Autopolis International Racing Course - Short Course",
"BB Raceway",
"BB Raceway Reverse",
"Blue Moon Bay Speedway",
"Blue Moon Bay Speedway - Infield A",
"Blue Moon Bay Speedway - Infield A Reverse",
"Blue Moon Bay Speedway - Infield B",
"Blue Moon Bay Speedway - Infield B Reverse",
"Blue Moon Bay Speedway Reverse",
"Brands Hatch Grand Prix Circuit",
"Brands Hatch Indy Circuit",
"Circuit de Barcelona-Catalunya GP Layout",
"Circuit de Barcelona-Catalunya GP Layout No Chicane",
"Circuit de Barcelona-Catalunya National Layout",
"Circuit de Barcelona-Catalunya Rallycross Layout",
"Circuit de Sainte-Croix - A",
"Circuit de Sainte-Croix - A Reverse",
"Circuit de Sainte-Croix - B",
"Circuit de Sainte-Croix - B Reverse",
"Circuit de Sainte-Croix - C",
"Circuit de Sainte-Croix - C Reverse",
"Circuit de Spa-Francorchamps",
"Circuit Gilles-Villeneuve",
"Colorado Springs - Lake",
"Colorado Springs - Lake Reverse",
"Daytona Road Course",
"Daytona Tri-Oval",
"Deep Forest Raceway",
"Deep Forest Raceway Reverse",
"Dragon Trail - Gardens",
"Dragon Trail - Gardens Reverse",
"Dragon Trail - Seaside",
"Dragon Trail - Seaside Reverse",
"Eiger Nordwand",
"Eiger Nordwand Reverse",
"Fishermans Ranch",
"Fishermans Ranch Reverse",
"Fuji International Speedway",
"Fuji International Speedway (Short)",
"Goodwood Motor Circuit",
"Grand Valley - Highway 1",
"Grand Valley - Highway 1 Reverse",
"Grand Valley - South",
"Grand Valley - South Reverse",
"High Speed Ring",
"High Speed Ring Reverse",
"Kyoto Driving Park - Miyabi",
"Kyoto Driving Park - Yamagiwa",
"Kyoto Driving Park - Yamagiwa Reverse",
"Kyoto Driving Park - Yamagiwa+Miyabi",
"Kyoto Driving Park - Yamagiwa+Miyabi Reverse",
"Lake Louise Long Track",
"Lake Louise Long Track Reverse",
"Lake Louise Short Track",
"Lake Louise Short Track Reverse",
"Lake Louise Tri-Oval",
"Lake Louise Tri-Oval Reverse",
"Michelin Raceway Road Atlanta",
"Mount Panorama Motor Racing Circuit",
"Northern Isle Speedway",
"Nürburgring 24h",
"Nürburgring Endurance",
"Nürburgring Endurance II",
"Nürburgring GP",
"Nürburgring Nordschleife",
"Nürburgring Nordschleife Tourist",
"Nürburgring Sprint",
"Red Bull Ring",
"Red Bull Ring Short Track",
"Sardegna - Road Track - A",
"Sardegna - Road Track - A Reverse",
"Sardegna - Road Track - B",
"Sardegna - Road Track - B Reverse",
"Sardegna - Road Track - C",
"Sardegna - Road Track - C Reverse",
"Sardegna - Windmills",
"Sardegna - Windmills Reverse",
"Spa 24h Layout",
"Special Stage Route X",
"Suzuka Circuit",
"Suzuka Circuit East Course",
"Tokyo Expressway - Central Clockwise",
"Tokyo Expressway - Central Counterclockwise",
"Tokyo Expressway - East Clockwise",
"Tokyo Expressway - East Counterclockwise",
"Tokyo Expressway - South Clockwise",
"Tokyo Expressway - South Counterclockwise",
"Trial Mountain Circuit",
"Trial Mountain Circuit Reverse",
"Tsukuba Circuit",
"Watkins Glen Long Course",
"Watkins Glen Short Course",
"WeatherTech Raceway Laguna Seca",
"Willow Springs International Raceway: Big Willow",
"Willow Springs International Raceway: Horse Thief Mile",
"Willow Springs International Raceway: Horse Thief Mile Reverse",
"Willow Springs International Raceway: Streets of Willow Springs",
"Willow Springs International Raceway: Streets of Willow Springs Reverse",
"Yas Marina Circuit"
    ] },
  {
    name: "Nascar Heat 5",
    vehicles: [
      "Cup Series",
      "Xfinity Series",
      "Truck Series",
      "Xtreme Dirt Tour"
    ],
    tracks: [
      "Atlanta Motor Speedway",
      "Auto Club Speedway",
      "Bristol Motor Speedway",
      "Bristol Motor Speedway (Dirt)",
      "Canadian Tire Motorsports Park",
      "Charlotte Motor Speedway",
      "Charlotte Motor Speedway ROVAL",
      "Chicagoland Speedway",
      "Darlington Raceway",
      "Daytona International Speedway",
      "Dover International Speedway",
      "Drebin Motor Speedway (Dirt)",
      "Eldora Speedway",
      "Fanatec Fairgrounds (Dirt)",
      "Homestead-Miami Speedway",
      "Indianapolis Motor Speedway",
      "Indianapolis Motor Speedway ROVAL",
      "Iowa Speedway",
      "Jefferson Raceway (Dirt)",
      "Kansas Speedway",
      "Kentucky Speedway",
      "Las Vegas Motor Speedway",
      "Martinsville Speedway",
      "Mid-Ohio Sports Car Course",
      "Michigan International Speedway",
      "New Hampshire Motor Speedway",
      "Phoenix Raceway",
      "Pocono Raceway",
      "Richmond Raceway",
      "Richmond Raceway (Dirt)",
      "Road America",
      "Sonoma Raceway",
      "Talladega Superspeedway",
      "The Dirt Track at Charlotte",
      "The Dirt Track at Las Vegas",
      "Texas Motor Speedway",
      "Texas Motor Speedway Dirt Track",
      "Watkins Glen International",
      "World Wide Technology Raceway at Gateway"
    ]
  },
  {
    name: "F1 24'",
    vehicles: ["Aston Martin", "Ferrari", "Mercedes", "Haas", "McLaren"],
    tracks: [
      "Albert Park, Melbourne (Australia)",
      "Algarve International Circuit, Portimão (Portugal)",
      "Autódromo Hermanos Rodríguez, Mexico City (Mexico)",
      "Autódromo José Carlos Pace, Interlagos (Brazil)",
      "Baku City Circuit (Azerbaijan)",
      "Bahrain International Circuit (Bahrain)",
      "Circuit de Barcelona-Catalunya (Spain)",
      "Circuit de Spa-Francorchamps (Belgium) – Remade",
      "Circuit Gilles Villenueve, Montreal (Canada)",
      "Circuit of the Americas (Texas, USA)",
      "Circuit Zandvoort (The Netherlands)",
      "Hungaroring (Hungary)",
      "Imola, Autodromo Internazionale Enzo e Dino Ferrari (Italy)",
      "Jeddah Corniche Circuit (Saudi Arabia) – Updated",
      "Las Vegas Strip Street Circuit (USA)",
      "Lusail International Circuit (Qatar) – Updated",
      "Miami International Autodrome (USA)",
      "Monte Carlo Grand Prix Circuit (Monaco)",
      "Monza (Italy)",
      "Red Bull Ring (Austria)",
      "Shanghai International Circuit (China)",
      "Silverstone (Great Britain) – Remade",
      "Singapore Marina Bay (Singapore)",
      "Suzuka (Japan)",
      "Yas Marina Circuit (Abu Dhabi)"
    ]
  },
  {
    name: "F1 25'",
    vehicles: ["Aston Martin", "Ferrari", "Mercedes", "Haas", "McLaren"],
    tracks: [
      "Albert Park, Melbourne (Australia) – Laser-scanned",
      "Autódromo Hermanos Rodríguez, Mexico City (Mexico)",
      "Autódromo José Carlos Pace, Interlagos (Brazil)",
      "Bahrain International Circuit (Bahrain) – Laser-scanned",
      "Baku City Circuit (Azerbaijan)",
      "Circuit de Barcelona-Catalunya (Spain)",
      "Circuit de Spa-Francorchamps (Belgium)",
      "Circuit Gilles Villenueve, Montreal (Canada)",
      "Circuit of the Americas (Texas, USA)",
      "Circuit Zandvoort (The Netherlands)",
      "Circuit Zandvoort (The Netherlands) – Reverse",
      "Hungaroring (Hungary)",
      "Imola, Autodromo Internazionale Enzo e Dino Ferrari (Italy) – Laser-scanned",
      "Imola, Autodromo Internazionale Enzo e Dino Ferrari (Italy) – Reverse",
      "Jeddah Corniche Circuit (Saudi Arabia)",
      "Las Vegas Strip Street Circuit (USA)",
      "Lusail International Circuit (Qatar)",
      "Miami International Autodrome (USA) – Laser-scanned",
      "Monte Carlo Grand Prix Circuit (Monaco)",
      "Monza (Italy)",
      "Red Bull Ring (Austria)",
      "Red Bull Ring (Austria) – Reverse",
      "Shanghai International Circuit (China)",
      "Silverstone (Great Britain)",
      "Silverstone (Great Britain) – Reverse",
      "Singapore Marina Bay (Singapore)",
      "Suzuka (Japan) – Laser-scanned",
      "Yas Marina Circuit (Abu Dhabi)"
    ]
  },
  {
    name: "iRacing",
    vehicles: ["ARCA Chevrolet SS",
"ARCA Ford Mustang",
"ARCA Toyota Camry",
"Acura ARX-06 GTP",
"Acura NSX GT3 EVO 22",
"Aston Martin DBR9 GT1",
"Aston Martin Vantage GT3 EVO",
"Aston Martin Vantage GT4",
"Audi 90 GTO",
"Audi R18 LMP1",
"Audi R8 LMS EVO II GT3",
"Audi R8 LMS GT3",
"Audi RS 3 LMS TCR",
"Audi RS3 LMS Gen2 TCR",
"BMW M Hybrid V8",
"BMW M2 CS Racing",
"BMW M4 F82 GT4 – 2018",
"BMW M4 G82 GT4 Evo",
"BMW M4 GT3 EVO",
"BMW M8 GTE",
"BMW Z4 GT3",
"Cadillac CTS-V",
"Cadillac V-Series.R GTP",
"C&R Racing Silver Crown Car",
"Chevrolet Corvette C6.R",
"Chevrolet Corvette C7 Daytona Prototype",
"Chevrolet Corvette C8.R",
"Chevrolet Corvette Z06 GT3.R",
"Dallara DW12",
"Dallara F3",
"Dallara iR-01",
"Dallara IL-15",
"Dallara IR05- Circa 2009",
"Dallara IR18 INDYCAR",
"Dallara P217 LMP2",
"DIRTcar 305 Sprint Car",
"DIRTcar 358 Small Block Modified",
"DIRTcar 360 Sprint Car",
"DIRTcar Limited Late Model",
"DIRTcar Pro Late Model",
"Dirt Legends Ford ’34 Coupe",
"Dirt Micro Sprint",
"Dirt Midget",
"Dirt Outlaw Micro Sprint – Non Winged",
"Dirt Outlaw Micro Sprint – Winged",
"Dirt Street Stock",
"Ferrari 296 Challenge",
"Ferrari 296 GT3",
"Ferrari 488 GTE",
"Ferrari 488 GT3",
"Ferrari 488 GT3 Evo 2020",
"Ferrari 499P",
"FIA Cross Car",
"FIA F4",
"Ford Fiesta RS WRC",
"Ford GT GTE",
"Ford GT-R",
"Ford Mustang FR500S",
"Ford Mustang GT3",
"Ford Mustang GT4",
"Formula Renault 2.0",
"Formula Renault 3.5",
"Formula Vee",
"Gen 4 Chevrolet Monte Carlo – 2003",
"Gen 4 Ford Taurus – 2003",
"Global Mazda MX-5 Cup",
"HPD ARX 01c",
"Honda Civic Type R TCR",
"Hyundai Elantra N TCR",
"Hyundai Veloster N TCR",
"Indy Pro 2000",
"Kia Optima",
"Late Model Stock",
"Legends Ford ’34 Coupe",
"Ligier JS P320",
"Lotus 49",
"Lotus 79",
"Lucas Oil Off Road Pro 2 Truck",
"Lucas Oil Off Road Pro 4 Truck",
"Lucas Oil Off-Road Pro 2 Lite Truck",
"Mazda MX-5 Cup – 2010",
"Mazda MX-5 Roadster – 2010",
"McLaren 570S GT4",
"McLaren 720S GT3 EVO",
"McLaren Honda MP4-30",
"McLaren MP4-12C GT3",
"Mercedes-AMG F1 W12 E Performance",
"Mercedes-AMG F1 W13 E Performance",
"Mercedes-AMG GT3",
"Mercedes-AMG GT3 2020",
"Mercedes-AMG GT4",
"Mini Stock",
"Mini Stock – Dirt",
"NASCAR Chevrolet Impala SS COT circa 2013",
"NASCAR Chevrolet SS Cup Car",
"NASCAR Cup Series Chevrolet Camaro ZL1",
"NASCAR Cup Series Ford Fusion",
"NASCAR Cup Series Ford Mustang",
"NASCAR Cup Series Toyota Camry",
"NASCAR Gen 4 Cup",
"NASCAR Legends Buick LeSabre – 1987",
"NASCAR Legends Chevrolet Monte Carlo – 1987",
"NASCAR Legends Ford Thunderbird – 1987",
"NASCAR Legends Pontiac Grand Prix – 1987",
"NASCAR O’Reilly Chevrolet Camaro",
"NASCAR O’Reilly Ford Mustang",
"NASCAR O’Reilly Toyota Supra",
"NASCAR Truck Chevrolet Silverado – 2008",
"NASCAR Truck RAM",
"NASCAR Truck Series Chevrolet Silverado",
"NASCAR Truck Series Dirt Chevrolet Silverado",
"NASCAR Truck Series Dirt Ford F-150",
"NASCAR Truck Series DIrt Toyota Tundra TRD",
"NASCAR Truck Series Ford F-150",
"NASCAR Truck Series Toyota Tundra TRD",
"NASCAR Whelen Tour Modified",
"NASCAR Xfinity Series Chevrolet Camaro 2018",
"NASCAR Xfinity Series Chevrolet Impala SS – Circa 2011",
"NASCAR Xfinity Series Ford Mustang 2018",
"NASCAR Xfinity Series Toyota Camry 2018",
"Next Gen NASCAR Cup Series Chevrolet Camaro ZL1",
"Next Gen NASCAR Cup Series Ford Mustang",
"Next Gen NASCAR Cup Series Toyota Camry",
"Nissan GTP ZX-T",
"OFFICIAL PARTNERS",
"Pontiac Solstice Club Sport",
"Pontiac Solstice Club Sport – Rookie",
"Porsche 911 Cup (992.1)",
"Porsche 911 Cup (992.2)",
"Porsche 911 GT3 Cup",
"Porsche 911 GT3 R",
"Porsche 911 GT3 R (992)",
"Porsche 911 RSR",
"Porsche 919 LMP1",
"Porsche 963 GTP",
"Porsche Mission R",
"Porsche 718 Cayman GT4 Clubsport",
"Pro Mazda",
"Radical SR10",
"Radical SR8 V8",
"Ray FF1600",
"Renault Clio R.S. V",
"Riley Mk XX Daytona Prototype",
"Ruf Rt 12 R",
"SCCA Spec Racer Ford",
"SK Modified Car",
"SRX",
"Skip Barber Formula 2000",
"Sprint Car",
"Street Stock – Casino",
"Street Stock – Eagle",
"Street Stock – Panther",
"Subaru WRX STI",
"Super DIRTcar Big Block Modified",
"Super Formula Lights",
"Super Formula SF23 – Honda",
"Super Formula SF23 – Toyota",
"Super Late Model",
"Supercars Chevrolet Camaro Gen 3",
"Supercars Ford Mustang Gen 3",
"Supercars Ford Mustang GT",
"Supercars Holden ZB Commodore",
"Toyota GR86",
"USAC 360 Sprint Car",
"USAC 410 Sprint Car",
"USF2000",
"UMP Modified",
"V8 Supercar Ford Falcon – 2009",
"V8 Supercar Ford FG Falcon – 2014",
"V8 Supercar Holden VF Commodore – 2014",
"Volkswagen Jetta TDi",
"VW Beetle",
"VW Beetle Lite",
"Williams-Toyota FW31",
"World of Outlaws 410 Sprint Car",
"World of Outlaws Super Late Model" 
],
    tracks: [
     "Adelaide Street Circuit",
"Auto Club Speedway",
"Autodromo Enzo e Dino Ferrari",
"Autodromo Nazionale Monza",
"Autódromo Hermanos Rodríguez",
"Autódromo Internacional do Algarve",
"Autódromo José Carlos Pace",
"Barber Motorsports Park",
"Bark River International Raceway",
"Brands Hatch Circuit",
"Bristol Motor Speedway",
"Cadwell Park",
"Canadian Tire Motorsport Park",
"Cedar Lake Speedway",
"Centripetal Circuit (included)",
"Charlotte Motor Speedway (included)",
"Chicago Street Course",
"Chicagoland Speedway",
"Chilli Bowl",
"Circuit Gilles-Villeneuve",
"Circuit Zandvoort",
"Circuit de Barcelona-Catalunya",
"Circuit de Ledenon (included)",
"Circuit de Nevers Magny-Cours",
"Circuit de Spa-Francorchamps",
"Circuit des 24 Heures du Mans",
"Circuit of the Americas",
"Circuit Zolder",
"Circuito de Jerez – Ángel Nieto",
"Circuito de Navarra (included)",
"Concord Speedway (included)",
"Crandon International Raceway",
"Darlington Raceway",
"Daytona International Speedway",
"Daytona International Speedway – Rallycross (included)",
"Detroit Grand Prix at Belle Isle",
"Dover Motor Speedway Sebring International Raceway",
"Echo Park Speedway",
"Eldora Speedway",
"Fairbury Speedway",
"Federated Auto Parts Raceway at I-55",
"Firebird Motorsports Park",
"Five Flags Speedway",
"Fuji Speedway",
"Hickory Motor Speedway",
"Hockenheimring",
"Homestead Miami Speedway",
"Hunagroring",
"Huset’s Speedway",
"Indianapolis Motor Speedway",
"iRacing Superspeedway",
"Iowa Speedway",
"Irwindale Speedway",
"Kansas Speedway",
"Kern Raceway",
"Kentucky Speedway",
"Knockhill Racing Circuit",
"Knoxville Raceway",
"Kokomo Speedway",
"LA Coliseum",
"Lanier National Speedway (included)",
"Lanier National Speedway – Dirt (included)",
"Langley Speedway (included)",
"Las Vegas Motor Speedway",
"Lånkebanen (HellRX)",
"Lernerville Speedway",
"Lime Rock Park (included)",
"Limaland Motorsports Park (included)",
"Lincoln Speedway",
"Locas Oil Indianapolis Raceway Park",
"Locas Oil Speedway",
"Long Beach Street Circuit",
"Martinsville Speedway",
"Miami International Autodrome",
"Michigan International Speedway",
"Michigan International Speedway – 2009",
"Mid-Ohio Sports Car Course",
"Michelin Raceway Road Atlanta",
"Millbridge Speedway",
"Misano World Circuit Marco Simoncelli",
"Mobility Resort Motegi",
"Motorsport Arena Oschersleben (included)",
"Mount Panorama Circuit",
"Mount Washington Auto Road",
"Mugello Circuit",
"Myrtle Beach Speedway",
"Nashville Fairgrounds Speedway",
"Nashville Superspeedway",
"New Hampshire Motor Speedway",
"New Jersey Motorsports Park",
"New Smyrna Speedway",
"North Wilkesboro Speedway",
"Nürburgring Grand-Prix-Strecke",
"Nürburgring Nordschleife",
"Okayama International Circuit (included)",
"Oran Park Raceway (included)",
"Oswego Speedway Sachsenring",
"Oulton Park (included)",
"Oxford Plains Speedway (included)",
"Philip Island Circuit",
"Phoenix Raceway",
"Phoenix Raceway – 2008 (included)",
"Pocono Raceway",
"Pocono Raceway – 2009",
"Port Royal Speedway",
"Portland International Raceway",
"Red Bull Ring",
"Richmond Raceway",
"Road America",
"Rockingham Speedway",
"Rudskogen Motorsenter (included)",
"Sandown International Motor Raceway",
"Sachsenring",
"Sebring International Raceway",
"Shell V-Power Motorsports Park at The Bend",
"Silverstone",
"Silverstone Circuit – 2008",
"Snetterton (included)",
"Sonoma Raceway",
"South Boston Speedway (included)",
"Southern National Motorsports Park (included)",
"Stafford Motor Speedway",
"St. Petersburg",
"Summit Point Motorsports Park (included)",
"Suzuka International Racing Course",
"Talladega Superspeedway",
"Texas Motor Speedway",
"Texas Motor Speedway",
"The Bullring at LVMS",
"The Dirt Track at Charlotte",
"The Milwaukee Mile",
"Thompson Speedway Motorsports Park (included)",
"Thruxton Circuit",
"Tsukuba Circuit (included)",
"USA International Speedway (included)",
"USA International Speedway – Dirt (included)",
"VIRginia International Raceway (included)",
"Volusia Speedway Park",
"Watkins Glen International",
"WeatherTech Raceway Laguna Seca",
"Weedsport Speedway",
"Williams Grove Speedway",
"Wild West Motorsports Park (included)",
"Winton Motor Raceway (included)",
"World Wide Technology Raceway (Gateway)"
    ]
  },
  {
    name: "WreckFest",
    vehicles: [],
    tracks: [
      "Bonebreaker Valley",
      "Crash Canyon",
      "Dirt Devil Stadium",
      "Hillstreet Circuit",
      "Madman Stadium",
      "Motorcity Circuit",
      "Rattlesnake Racepark",
      "Sandstone Raceway",
      "Savage Speedway",
      "Tarmac 1",
      "Tarmac 2"
    ]
  },
  {
    name: "WreckFest 2",
    vehicles: ["Roadslayer", "Rocket", "Striker", "Ginger"],
    tracks: [
      "Junkyard Jam",
      "Thunder Alley",
      "Demolition Dome",
      "Scrapyard Sprint",
      "Ironclad Circuit",
      "Chaos Crossing",
      "Blitz Bowl"
    ]
  },
  {
    name: "LeMans Ultimate",
    vehicles: [
      "LMDh / Hypercar - Alpine A424 (2024 Pack 2 DLC)",
"LMDh / Hypercar - Aston Martin Valkyrie AMR LMH Hypercar",
"LMDh / Hypercar - BMW M Hybrid V8 (free DLC)",
"LMDh / Hypercar - Cadillac V-Series.R",
"LMDh / Hypercar - Ferrari 499P",
"LMDh / Hypercar - Genesis GMR-001 LMDh",
"LMDh / Hypercar - Glickenhaus SCG 007",
"LMDh / Hypercar - Isotta Fraschini Tipo 6-C (2024 Pack 2 DLC)",
"LMDh / Hypercar - Lamborghini SC63 (2024 Pack 1 DLC)",
"LMDh / Hypercar - Peugeot 9X8 2023",
"LMDh / Hypercar - Peugeot 9X8 2024 (2024 Pack 1 DLC)",
"LMDh / Hypercar - Porsche 963",
"LMDh / Hypercar - Toyota GR010-Hybrid",
"LMDh / Hypercar - Vanwall Vandervell 680",
"LMP2 - Oreca 07 Gibson",
"LMP2 - Oreca 07 Gibson ELMS",
"LMP3 - Ligier JS P325 (ELMS Season Pass or ELMS Pack 1 DLC)",
"LMP3 - Ginetta G61-LT-P3 Evo (ELMS Season Pass or ELMS Pack 2 DLC)",
"LMP3 - Duqueine D09 (ELMS Season Pass or ELMS Pack 3 DLC)",
"GTE - Aston Martin Vantage GTE",
"GTE - Chevrolet Corvette C8.R",
"GTE - Ferrari 488 GTE Evo",
"GTE - Porsche 911 RSR-19",
"LMGT3 - Aston Martin Vantage AMR LMGT3 Evo (2024 Pack 4 DLC)",
"LMGT3 - BMW M4 LMGT3 (2024 Pack 3 DLC)",
"LMGT3 - BMW M4 LMGT3 Evo (2024 Pack 3 DLC)",
"LMGT3 - Chevrolet Corvette Z06 LMGT3.R (2024 Pack 3 DLC)",
"LMGT3 - Ferrari 296 LMGT3 (2024 Pack 3 DLC)",
"LMGT3 - Ford Mustang LMGT3 (free DLC)",
"LMGT3 - Lamborghini Huracán LMGT3 Evo 2 (2024 Pack 5 DLC)",
"LMGT3 - Lexus RC F LMGT3 (2024 Pack 5 DLC)",
"LMGT3 - Mercedes-AMG LMGT3",
"LMGT3 - McLaren 720S LMGT3 Evo (free DLC)",
"LMGT3 - Porsche 911 LMGT3 R (992) (2024 Pack 4 DLC)"
    ],
    tracks: [
     "Algarve International Circuit (Portimão)",
"Autodromo Internazionale Enzo e Dino Ferrari (Imola) (2024 Pack 1 DLC)",
"Autódromo José Carlos Pace (Interlagos) (2024 Pack 3 DLC)",
"Bahrain International Circuit",
"Circuit of the Americas (2024 Pack 2 DLC)",
"Circuit de la Sarthe",
"Fuji International Speedway",
"Lusail International Circuit (2024 Pack 5 DLC)",
"Monza",
"Sebring",
"Spa-Francorchamps",
"ELMS Track - Circuit de Barcelona-Catalunya (ELMS Pack 3 DLC)",
"ELMS Track - Circuit Paul Ricard (ELMS Pack 2 DLC)",
"ELMS Track - Silverstone (ELMS Pack 1 DLC)",
"ELMS Layout - Algarve International Circuit (Portimão) ELMS",
"ELMS Layout - Autodromo Internazionale Enzo e Dino Ferrari (Imola) ELMS (2024 Pack 1 DLC)",
"Layout - COTA National",
"Layout - Bahrain International Endurance Circuit",
"Layout - Bahrain International Outer Circuit",
"Layout - Bahrain International Paddock Circuit",
"Layout - Fuji Classic Layout (No Chicane)",
"Layout - Circuit de la Sarthe Mulsanne No Chicanes",
"Layout - Lusail International Circuit Short",
"Layout - Monza Curva Grande Layout",
"Layout - Paul Ricard 1a",
"Layout - Paul Ricard 1av2",
"Layout - Paul Ricard 1av2-short",
"Layout - Paul Ricard 3a",
"Layout - Sebring School Circuit",
"Layout - Silverstone National",
"Layout - Silverstone International",
"Layout - Silverstone GP (WEC)",
"Layout - Spa Endurance Layout (62-car support)"
    ]
  },
  {
    name: "Kart Racing|PRO (COMING SOON!!)",
    vehicles: ["Lightning Kart", "Shadow Kart", "Dragon Kart"],
    tracks: [
      "(COMING SOON)",
      "Turbo Park",
      "Desert Drift",
      "Frosty Freeway",
      "Jungle Jam",
      "Mountain Mayhem",
      "Skyline Circuit",
      "Volcano Valley"
    ]
  },
  {
    name: "Dirt Rally 2.0 (COMING SOON)",
    vehicles: [],
    tracks: [
      "(COMING SOON)",
      "Argentina - Valle de los Puentes",
      "Argentina - El Rodeo",
      "Australia - Noorinbee Ridge",
      "Australia - Mount Kaye Pass",
      "New Zealand - Waimarama Point",
      "New Zealand - Ocean Beach Sprint",
      "Spain - Centenera",
      "Spain - Ascenso bosque Montverd",
      "USA - North Fork Pass",
      "USA - Hancock Hill Sprint",
      "Poland - Czarny Las",
      "Poland - Marynka"
    ]
  }
];

/* Why features + reviews (unchanged) */
const WHY_FEATURES = [
  {
    icon: "🏎️",
    title: "Tailored to Your Driving",
    desc:
      "Tunes made for your car, your style, your game. Feel the difference on track instantly."
  },
  {
    icon: "⚡",
    title: "Fast Turnaround",
    desc: "Receive your tune within 24 hours. Quick service, no waiting."
  },
  {
    icon: "💡",
    title: "Expert Knowledge",
    desc: "Each tune is developed and tested by a veteran team of racers."
  },
  {
    icon: "🎮",
    title: "Cross-Platform",
    desc:
      "Works for Xbox, PlayStation, PC – all supported games, all the best setups."
  }
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
    extra?.tracks && extra.tracks.length
      ? `(${extra.tracks.length} tracks)`
      : ""
  ]
    .filter(Boolean)
    .join(" / ");
}
function toUSD(n) {
  return (Math.round(Number(n) * 100) / 100).toFixed(2);
}

/* --------- CART RENDER --------- */
function renderCart() {
  const itemsEl = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  const payBtn = document.getElementById("paypal-button-container");
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
  if (totalEl)
    totalEl.innerHTML = `<div class="cart-total">Total: <b>$${toUSD(
      total
    )}</b></div>`;

  renderPayPalButton(); // render Smart Buttons for full cart
  updateCartCount();
}
window.removeCart = function (i) {
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
    const features = bundle.features
      .map((f) => `<li style="color:var(--accent-ice);">${f}</li>`)
      .join("");
    const tierOptions = tierTiers
      .map(
        (t, idx) =>
          `<option value="${idx}">${t.name} (+$${toUSD(t.price)})</option>`
      )
      .join("");

    grid.insertAdjacentHTML(
      "beforeend",
      `<div class="pricing-card" style="opacity:0;">
         <h3>${bundle.name}</h3>
         <div class="price-tag" style="color:var(--accent-ice);">$${toUSD(
           bundle.base
         )}</div>
         <ul class="features-list">${features}</ul>
         <select id="bundle-game-${i}" onchange="onBundleGame(${i})">
           <option value="">Select Game</option>
           ${GAME_DATA.map((g) => `<option>${g.name}</option>`).join("")}
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
    const features = tier.features
      .map((f) => `<li style="color:var(--accent-ice);">${f}</li>`)
      .join("");

    grid.insertAdjacentHTML(
      "beforeend",
      `<div class="pricing-card" style="opacity:0;">
         <h3>${tier.name}</h3>
         <div class="price-tag" style="color:var(--accent-ice);">$${toUSD(
           tier.price
         )}</div>
         <ul class="features-list">${features}</ul>
         <select id="game-flat-${idx}" onchange="onGameFlat(${idx})">
           <option value="">Select Game</option>
           ${GAME_DATA.map((g) => `<option>${g.name}</option>`).join("")}
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
  gsap.utils.toArray(".pricing-card").forEach((card) => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      })
      .to(card, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
  });
}

/* --------- Bundles (1–3) controls --------- */
window.onBundleGame = (idx) => {
  const gameSel = document.getElementById(`bundle-game-${idx}`);
  const vehicleSel = document.getElementById(`bundle-vehicle-${idx}`);
  const trackSel = document.getElementById(`bundle-track-${idx}`);
  const tierSel = document.getElementById(`bundle-tier-${idx}`);
  const btn = document.getElementById(`btn-bundle-${idx}`);

  vehicleSel.disabled = trackSel.disabled = tierSel.disabled = true;
  btn.disabled = true;
  vehicleSel.innerHTML = `<option>Select Vehicle</option>`;
  trackSel.innerHTML = `<option>Select Track</option>`;

  const game = GAME_DATA.find((g) => g.name === gameSel.value);
  if (!game) return;

  vehicleSel.innerHTML += game.vehicles
    .map((v) => `<option>${v}</option>`)
    .join("");
  trackSel.innerHTML += game.tracks
    .map((t) => `<option>${t}</option>`)
    .join("");
  vehicleSel.disabled = false;

  vehicleSel.onchange = () => {
    trackSel.disabled = false;
    tierSel.disabled = true;
    btn.disabled = true;

    trackSel.onchange = () => {
      tierSel.disabled = false;
      btn.disabled = true;

      tierSel.onchange = () => {
        btn.disabled = false;
      };
    };
  };
};
window.addBundleTier = (idx) => {
  const game = document.getElementById(`bundle-game-${idx}`).value;
  const vehicle = document.getElementById(`bundle-vehicle-${idx}`).value;
  const track = document.getElementById(`bundle-track-${idx}`).value;
  const tierIdx = document.getElementById(`bundle-tier-${idx}`).value;
  const notes = document
    .getElementById(`bundle-notes-${idx}`)
    .value.trim()
    .slice(0, 250);
  if (!game || !vehicle || !track || tierIdx === "") {
    return alert("Please select game, vehicle, track & tier.");
  }

  const bundle = bundleTiers[idx];
  const tier = tierTiers[parseInt(tierIdx, 10)];
  const price = Number(bundle.base) + Number(tier.price);

  cart.push({
    kind: "bundle",
    id: bundle.id,
    name: bundle.name,
    tier: tier.name,
    game,
    vehicle,
    track,
    price,
    notes,
    displayName: composeCartName(bundle, {
      tier: tier.name,
      game,
      vehicle,
      track
    })
  });

  renderCart();
};

/* --------- Flat Tiers (4–6) controls --------- */
window.onGameFlat = (idx) => {
  const gameSel = document.getElementById(`game-flat-${idx}`);
  const carSel = document.getElementById(`car-flat-${idx}`);
  const trackSel = document.getElementById(`track-flat-${idx}`);
  const btn = document.getElementById(`btn-flat-${idx}`);

  carSel.disabled = trackSel.disabled = true;
  btn.disabled = true;
  carSel.innerHTML = `<option>Select Vehicle</option>`;
  trackSel.innerHTML = `<option>Select Track</option>`;

  const game = GAME_DATA.find((g) => g.name === gameSel.value);
  if (!game) return;

  carSel.innerHTML += game.vehicles
    .map((v) => `<option>${v}</option>`)
    .join("");
  trackSel.innerHTML += game.tracks
    .map((t) => `<option>${t}</option>`)
    .join("");
  carSel.disabled = false;

  carSel.onchange = () => {
    trackSel.disabled = false;
    btn.disabled = true;
    trackSel.onchange = () => (btn.disabled = false);
  };
};
window.addFlat = (idx) => {
  const game = document.getElementById(`game-flat-${idx}`).value;
  const vehicle = document.getElementById(`car-flat-${idx}`).value;
  const track = document.getElementById(`track-flat-${idx}`).value;
  const notes = document
    .getElementById(`flat-notes-${idx}`)
    .value.trim()
    .slice(0, 250);
  const tierIdx = idx - bundleTiers.length;

  if (!game || !vehicle || !track) {
    return alert("Please select game, vehicle & track.");
  }
  const pkg = tierTiers[tierIdx];
  const price = Number(pkg.price);

  cart.push({
    kind: "flat",
    id: pkg.id,
    name: pkg.name,
    game,
    vehicle,
    track,
    price,
    notes,
    displayName: composeCartName(pkg, { game, vehicle, track })
  });

  renderCart();
};

/* --------- Coaching add --------- */
window.sendCoachingRequest = () => {
  const nameEl = document.getElementById("name-coach");
  const emailEl = document.getElementById("email-coach");
  const detEl = document.getElementById("detail-coach");
  const name = nameEl ? nameEl.value.trim() : "";
  const email = emailEl ? emailEl.value.trim() : "";
  const detail = detEl ? detEl.value.trim() : "";

  if (!name || !email || !detail) {
    return alert("Please complete all required fields for Custom Coaching.");
  }

  cart.push({
    kind: "coach",
    id: coachingTier.id,
    name: coachingTier.name,
    price: Number(coachingTier.price),
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
document
  .getElementById("cart-icon-navbar")
  ?.addEventListener("click", toggleCartModal);
document
  .getElementById("close-cart-modal-navbar")
  ?.addEventListener("click", toggleCartModal);

/* --------- PAYPAL: SMART BUTTONS (FULL CART) --------- */
async function renderPayPalButton() {
  const btnContainer = document.getElementById("paypal-button-container");
  const resultMsg = document.getElementById("result-message");
  if (!btnContainer) return;

  btnContainer.innerHTML = "";
  if (resultMsg) resultMsg.textContent = "";
  if (cart.length === 0) return;

  await paypalReady;
  if (!window.paypal || !window.paypal.Buttons) {
    btnContainer.innerHTML =
      "<div style='color:red;'>PayPal SDK not ready.</div>";
    return;
  }

  // Build purchase_units for the WHOLE cart
  const items = cart.map((it, i) => {
    const name = it.displayName || it.name || `Item ${i + 1}`;
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

  paypal
    .Buttons({
      style: { layout: "vertical", shape: "rect", label: "pay" },

      createOrder: function (data, actions) {
        return actions.order.create(orderPayload);
      },

      onApprove: async function (data, actions) {
        try {
          const details = await actions.order.capture();
          // Success UI
          const buyer = details?.payer?.name?.given_name || "there";
          if (resultMsg)
            resultMsg.innerHTML = `Thanks, ${buyer}! Your payment was successful.`;
          // Clear cart
          cart = [];
          renderCart();
        } catch (err) {
          if (resultMsg)
            resultMsg.textContent =
              "Payment captured but a display error occurred.";
          console.error(err);
        }
      },

      onError: function (err) {
        if (resultMsg)
          resultMsg.textContent =
            "Something went wrong with PayPal. Please try again.";
        console.error(err);
      }
    })
    .render(btnContainer);
}

/* ===========================================================
   NASCAR 25 — track selection UI + add logic (unchanged)
=========================================================== */
const NASCAR25_SERIES_TRACKS = {
  "CUP SERIES": [
    "Bristol Motor Speedway",
    "Charlotte Motor Speedway",
    "Charlotte Road Course",
    "Chicago Street Course",
    "Circuit of the Americas",
    "Darlington Raceway",
    "Daytona International Speedway",
    "Dover Motor Speedway",
    "EchoPark Speedway",
    "Homestead-Miami Speedway",
    "Indianapolis Motor Speedway",
    "Iowa Speedway",
    "Kansas Speedway",
    "Las Vegas Motor Speedway",
    "Martinsville Speedway",
    "Michigan Speedway",
    "Nashville Superspeedway",
    "New Hampshire Motor Speedway",
    "North Wilkesboro Speedway",
    "Phoenix Raceway",
    "Pocono Raceway",
    "Richmond Raceway",
    "Sonoma Raceway",
    "Talladega Superspeedway",
    "Texas Motor Speedway",
    "Watkins Glen International",
    "World Wide Technology Raceway"
  ],
  "XFINITY SERIES": [
    "Bristol Motor Speedway",
    "Charlotte Motor Speedway",
    "Charlotte Road Course",
    "Chicago Street Course",
    "Circuit of the Americas",
    "Darlington Raceway",
    "Daytona International Speedway",
    "Dover Motor Speedway",
    "EchoPark Speedway",
    "Homestead-Miami Speedway",
    "Indianapolis Motor Speedway",
    "Iowa Speedway",
    "Kansas Speedway",
    "Las Vegas Motor Speedway",
    "Martinsville Speedway",
    "Michigan Speedway",
    "Nashville Superspeedway",
    "Phoenix Raceway",
    "Pocono Raceway",
    "Rockingham Speedway",
    "Sonoma Raceway",
    "Talladega Superspeedway",
    "Texas Motor Speedway",
    "Watkins Glen International",
    "World Wide Technology Raceway"
  ],
  "TRUCK SERIES": [
    "Bristol Motor Speedway",
    "Charlotte Motor Speedway",
    "Charlotte Road Course",
    "Darlington Raceway",
    "Daytona International Speedway",
    "EchoPark Speedway",
    "Homestead-Miami Speedway",
    "Kansas Speedway",
    "Las Vegas Motor Speedway",
    "Lime Rock Park",
    "Lucas Oil Indianapolis Raceway Park",
    "Martinsville Speedway",
    "Michigan Speedway",
    "Nashville Superspeedway",
    "New Hampshire Motor Speedway",
    "North Wilkesboro Speedway",
    "Phoenix Raceway",
    "Pocono Raceway",
    "Richmond Raceway",
    "Rockingham Speedway",
    "Talladega Superspeedway",
    "Texas Motor Speedway",
    "Watkins Glen International"
  ],
  "ARCA SERIES": [
    "Bristol Motor Speedway",
    "Charlotte Motor Speedway",
    "Daytona International Speedway",
    "Dover Motor Speedway",
    "Iowa Speedway",
    "Kansas Speedway",
    "Lime Rock Park",
    "Lucas Oil Indianapolis Raceway Park",
    "Martinsville Speedway",
    "Michigan Speedway",
    "North Wilkesboro Speedway",
    "Phoenix Raceway",
    "Richmond Raceway",
    "Rockingham Speedway",
    "Talladega Superspeedway",
    "Watkins Glen International"
  ]
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
  const status =
    card.querySelector(".nascar-track-status") ||
    (function () {
      const d = document.createElement("div");
      d.className = "nascar-track-status";
      d.style.marginTop = "8px";
      d.style.color = "#ffd700";
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
    intro.innerHTML = `<strong>Full Series Selected — All tracks in package will be included.</strong>`;
    box.appendChild(intro);
    const list = document.createElement("div");
    list.style.maxHeight = "160px";
    list.style.overflowY = "auto";
    list.style.marginTop = "8px";
    list.style.border = "1px solid rgba(255,255,255,0.06)";
    list.style.padding = "8px";
    list.style.borderRadius = "6px";
    list.innerHTML = seriesTracks
      .map((t) => `<div style="padding:4px 0;">✔ ${t}</div>`)
      .join("");
    box.appendChild(list);
    box.dataset.selected = JSON.stringify(seriesTracks.slice());
    status.textContent = `Tracks included: All Tracks In Package`;
    box.style.display = "block";
    return;
  }

  const info = document.createElement("div");
  info.innerHTML = `<strong>Select up to ${limit} track${
    limit === 1 ? "" : "s"
  } for this package</strong>`;
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

  seriesTracks.forEach((t, i) => {
    const id = `nascar-${seriesKey.replace(
      /\s+/g,
      "-"
    )}-${i}-${Math.random().toString(36).slice(2, 7)}`;
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
    const sel = inputs.filter((x) => x.checked).map((x) => x.value);
    box.dataset.selected = JSON.stringify(sel);
    if (sel.length >= limit) {
      inputs.forEach((x) => {
        if (!x.checked) {
          x.disabled = true;
          x.parentElement.style.opacity = "0.5";
        }
      });
    } else {
      inputs.forEach((x) => {
        x.disabled = false;
        x.parentElement.style.opacity = "1";
      });
    }
    status.textContent = `Tracks selected: ${sel.length}/${limit} — ${Math.max(
      0,
      limit - sel.length
    )} left`;
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
    try {
      tracks = JSON.parse(box.dataset.selected) || [];
    } catch (e) {
      tracks = [];
    }
  }

  // enforce counts
  if (/single/i.test(optionText) && tracks.length !== 1)
    return alert("Single track package requires exactly 1 track selected.");
  if (/5-Track|5 Track/i.test(optionText) && tracks.length !== 5)
    return alert("Please select exactly 5 tracks for the 5-Track Pack.");
  if (/10-Track|10 Track/i.test(optionText) && tracks.length !== 10)
    return alert("Please select exactly 10 tracks for the 10-Track Pack.");

  const isFull = /full|complete|all/i.test(optionText);
  if (!isFull && tracks.length === 0)
    return alert("Please select your tracks for this package.");
  if (isFull && (!tracks || tracks.length === 0)) {
    tracks = NASCAR25_SERIES_TRACKS[seriesKey] || [];
  }

  const productName = `${seriesKey} — ${optionText}`;
  const displayName = composeCartName({ name: productName }, { tracks });

  cart.push({
    kind: "nascar25",
    id: `nascar25-${seriesKey}-${optionValue}`,
    name: productName,
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
    btn.disabled = true;
    btn.textContent = "Added!";
    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = prev;
    }, 900);
  }
}
function initNascar25Integration() {
  const section = document.getElementById("nascar25");
  if (!section) return;
  const cards = section.querySelectorAll(".pricing-card");
  cards.forEach((card) => {
    const seriesKey =
      (card.dataset.series || "").toUpperCase() ||
      (function () {
        const t = card.querySelector("h2")?.textContent?.toUpperCase() || "";
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
      clone.addEventListener("change", () =>
        renderNascarTrackBox(card, seriesKey)
      );
    }

    const btn = card.querySelector(".add-btn");
    if (btn) {
      const cloneBtn = btn.cloneNode(true);
      btn.parentNode.replaceChild(cloneBtn, btn);
      cloneBtn.addEventListener("click", () =>
        handleNascarAdd(card, seriesKey)
      );
    }
  });
}

/* --------- DOM READY --------- */
document.addEventListener("DOMContentLoaded", () => {
  ["pricing", "reviews", "why-tune"].forEach((id) => {
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
    gsap.from(".main-hero-title", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });
    gsap.from(".hero-desc", { y: 30, opacity: 0, delay: 0.3, duration: 0.8 });
    gsap.from(".hero-cta", {
      scale: 0.8,
      opacity: 0,
      delay: 0.6,
      duration: 0.6
    });
    document.querySelectorAll(".fade-section").forEach((sec) => {
      gsap.to(sec, {
        opacity: 1,
        y: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sec,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
    });
  }

  const whyGrid = document.getElementById("why-tune-features-grid");
  if (whyGrid) {
    whyGrid.innerHTML = WHY_FEATURES.map(
      (f) =>
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

  window.scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };
});
