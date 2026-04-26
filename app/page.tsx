'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AgeGate from '../components/AgeGate'
import AboutSection from '../components/AboutSection'
import FindUsSection from '../components/FindUsSection'
import Footer from '../components/Footer'


const FRAMES = 169
const getFrame = (i: number) => `/harbourbridge/ezgif-frame-${String(i + 1).padStart(3, '0')}.webp`

const BRANDS = [
  {
    name: 'WOTOFO', color: '#00E5FF',
    products: [
      { name: 'Wotofo nexPOD Stick — Starter Kit', badge: 'STARTER KIT', badgeColor: '#BF00FF', puffs: '3,500 puffs', price: '$9.99', specs: '5.5ml · Mesh coil · Rechargeable · USB-C', nicotine: '20mg/ml', note: 'Includes battery + pod', flavours: ['Banana', 'Sour Lemon', 'Sour Raspberry', 'Tropical', 'Peach', 'Kiwifruit Pineapple', 'Blue Razz Ice', 'Cool Mint', 'Cola Ice', 'Golden Tobacco', 'Grape Ice', 'Kiwi Guava Passionfruit', 'Menthol Ice', 'Orange Soda', 'Peach Blueberry Ice', 'Peach Lemonade', 'Sour Apple', 'Strawberry Mango', 'Watermelon Ice'] },
      { name: 'Wotofo nexPOD Stick — Replacement Pods', badge: 'POD', badgeColor: '#BF00FF', puffs: '3,500 puffs', price: '$9.99', specs: '5.5ml · Fits nexPOD Stick battery kit', nicotine: '20mg/ml', note: 'Pod only — battery sold separately', flavours: ['Banana', 'Sour Lemon', 'Sour Raspberry', 'Tropical', 'Peach', 'Kiwifruit Pineapple', 'Blue Razz Ice', 'Cool Mint', 'Cola Ice', 'Golden Tobacco', 'Grape Ice', 'Kiwi Guava Passionfruit', 'Menthol Ice', 'Orange Soda', 'Peach Blueberry Ice', 'Peach Lemonade', 'Sour Apple', 'Strawberry Mango', 'Watermelon Ice'] },
      { name: 'Wotofo nexPOD Stick — Battery Kit', badge: 'DEVICE', badgeColor: '#6b6b90', puffs: 'Device only', price: '$10.00', specs: 'Rechargeable battery · USB-C', nicotine: 'Pods sold separately', note: 'Device only — pods sold separately', flavours: [] },
      { name: 'Wotofo Nexpod 25K — Prefilled Starter Kit', badge: 'STARTER KIT', badgeColor: '#00E5FF', puffs: '25,000 puffs', price: '$30.00', specs: '18.5ml · 0.5Ω dual mesh · 1000mAh · USB-C · LED screen · Dual modes · Child lock', nicotine: '26mg/ml', note: 'Includes battery + pod', flavours: ['Pineapple Coconut', 'Sour Lemon', 'Sweet Cream', 'Peach Apple', 'Blackberry Pomegranate', 'Strawberry Lemon', 'Lychee Passionfruit', 'Blueberry Watermelon'] },
      { name: 'Wotofo Nexpod 25K — Replacement Pods 26mg', badge: 'POD', badgeColor: '#00E5FF', puffs: '25,000 puffs', price: '$20.00', specs: '18.5ml · 0.5Ω dual mesh · Fits Nexpod 25K device', nicotine: '26mg/ml', note: 'Pod only — requires Nexpod 25K battery device', flavours: ['Pineapple Coconut', 'Sour Lemon', 'Sweet Cream', 'Peach Apple', 'Blackberry Pomegranate', 'Strawberry Lemon', 'Lychee Passionfruit', 'Blueberry Watermelon'] },
    ],
  },
  {
    name: 'INMOOD', color: '#00E5FF',
    products: [
      { name: 'Inmood Switch 2 — Replacement Pods 30K', badge: 'POD', badgeColor: '#00E5FF', puffs: '30,000 puffs', price: '$25.00', specs: 'Next-gen Switch 2 pod · 30,000 puffs · USB-C · Requires Switch 2 Battery Kit', nicotine: '20mg/mL', note: 'Compatible with Switch 2 Battery Kit only', flavours: [] },
      { name: 'Inmood Switch 2 — Battery Kit', badge: 'DEVICE', badgeColor: '#6b6b90', puffs: 'Device only', price: '$15.00', specs: 'Switch 2 battery · USB-C · Compatible with Switch 2 pods only', nicotine: 'Pods sold separately', note: 'Next generation Switch 2 device', flavours: [] },
      { name: 'Inmood Switch — Replacement Pod 26mg', badge: 'POD', badgeColor: '#00E5FF', puffs: '5,000 puffs', price: '$15.00', specs: '10ml · 1.0Ω mesh coil · Fits all Switch battery kits', nicotine: '26mg/ml (High Strength)', note: 'All flavours have an icy finish', flavours: ['Banana (Ice)', 'Berry Lemon', 'Blackberry', 'Blueberry (Ice)', 'Blueberry Cherry', 'Blueberry Lemon', 'Blueberry Raspberry', 'Cherry Pomegranate', 'Grape', 'Grape Berry', 'Guava Passionfruit', 'Kiwifruit Pineapple (Ice)', 'Lemon Mint', 'Lychee (Ice)', 'Mango Peach (Ice)', 'Menthol (Ice)', 'Mint', 'Peach', 'Peach Blueberry', 'Peach Lemon', 'Peach Pineapple', 'Pineapple (Ice)', 'Pineapple Passionfruit', 'Raspberry Grape', 'Sour Apple', 'Strawberry', 'Strawberry Banana', 'Strawberry Blueberry', 'Strawberry Kiwifruit', 'Sweet Berry', 'Tea (Ice)', 'Tobacco', 'Vanilla Spice', 'Watermelon', 'Banana Custard', 'Strawberry Custard', 'Peach Blueberry Custard', 'Coffee'] },
      { name: 'Inmood Switch — Replacement Pod 16mg', badge: 'POD', badgeColor: '#00E5FF', puffs: '5,000 puffs', price: '$15.00', specs: '10ml · 1.0Ω mesh coil · Fits all Switch battery kits', nicotine: '16mg/ml (Low Strength)', note: '', flavours: ['Peach Blueberry', 'Blueberry', 'Watermelon', 'Vanilla Spice', 'Sour Apple', 'Pineapple', 'Peach Pineapple', 'Grape Berry', 'Guava Passionfruit', 'Mango Peach', 'Berry Lemon', 'Mint', 'Strawberry Kiwifruit', 'Strawberry Banana', 'Kiwifruit Pineapple'] },
      { name: 'Inmood Switch — Replacement Pod 0% Nicotine', badge: 'POD', badgeColor: '#22c55e', puffs: '5,000 puffs', price: '$15.00', specs: '10ml · 1.0Ω mesh coil · Fits all Switch battery kits', nicotine: '0% — Zero Nicotine', note: 'Nicotine-free option', flavours: ['Blueberry', 'Blueberry Raspberry', 'Cherry Pomegranate', 'Mango Peach', 'Mint', 'Pineapple', 'Sour Apple', 'Sweet Berry', 'Vanilla Spice'] },
      { name: 'Inmood Switch — Twin Pack (2 Pods) 26mg', badge: 'TWIN PACK', badgeColor: '#f59e0b', puffs: '5,000 puffs × 2', price: '$25.00', specs: '2 × pre-filled replacement pods · 26mg/ml', nicotine: '26mg/ml', note: 'Value pack — 2 pods included · Battery sold separately', flavours: ['Sour Lemon', 'Watermelon Passionfruit', 'Pineapple Coconut', 'Strawberry Watermelon', 'Strawberry Mango'] },
      { name: 'Inmood Switch — Starter Kit', badge: 'STARTER KIT', badgeColor: '#00E5FF', puffs: '5,000 puffs', price: '$20.00', specs: '550mAh removable battery · USB-C · 1.0Ω mesh coil · Adjustable airflow · Child lock', nicotine: '26mg/ml or 16mg/ml', note: 'Includes battery device + 1 pre-filled pod', flavours: [] },
      { name: 'Inmood Switch+ — Battery Kit (Upgraded)', badge: 'DEVICE', badgeColor: '#6b6b90', puffs: 'Device only', price: '$10.00', specs: '650mAh (upgraded) · USB-C · Adjustable airflow · Child lock', nicotine: 'Pods sold separately', note: 'On/Off: tap USB port 5 times · Compatible with all Switch pods', flavours: [] },
      { name: 'Inmood Prism — Starter Kit', badge: 'STARTER KIT', badgeColor: '#BF00FF', puffs: '15,000 puffs', price: '$30.00', specs: '1300mAh removable battery · 16ml · Dual mesh coils · USB-C · LED screen · Child lock', nicotine: '20mg/mL', note: 'Includes battery + pod', flavours: ['Cherry Blueberry', 'Strawberry Blueberry', 'Vanilla Spice', 'Sour Apple', 'Pineapple Coconut', 'Blackberry Cherry', 'Blueberry Raspberry', 'Raspberry Orange', 'Lemon Pineapple', 'Mango Grape', 'Watermelon Lychee', 'Strawberry Watermelon', 'Tropical Watermelon', 'Cherry Pomegranate', 'Watermelon Passionfruit', 'Strawberry Mango'] },
      { name: 'Inmood Prism — Replacement Pods 15K', badge: 'POD', badgeColor: '#BF00FF', puffs: '15,000 puffs', price: '$20.00', specs: '16ml · Dual mesh coils · Requires Prism Battery Kit', nicotine: '20mg/mL', note: 'Requires Inmood Prism Battery Kit (sold separately)', flavours: ['Cherry Blueberry', 'Strawberry Blueberry', 'Vanilla Spice', 'Sour Apple', 'Pineapple Coconut', 'Blackberry Cherry', 'Blueberry Raspberry', 'Raspberry Orange', 'Lemon Pineapple', 'Mango Grape', 'Watermelon Lychee', 'Strawberry Watermelon', 'Tropical Watermelon', 'Cherry Pomegranate', 'Watermelon Passionfruit', 'Strawberry Mango', 'Mint', 'Strawberry Kiwifruit', 'Sweet Grape', 'Peach Pineapple'] },
      { name: 'Inmood Prism — Replacement Pods 15K (28mg)', badge: 'POD', badgeColor: '#BF00FF', puffs: '15,000 puffs', price: '$20.00', specs: '16ml · Dual mesh coils · Requires Prism Battery Kit', nicotine: '28mg/mL (High Strength)', note: 'Requires Inmood Prism Battery Kit (sold separately)', flavours: ['Sweet Grape', 'Mint', 'Strawberry Mango', 'Strawberry Watermelon', 'Cherry Pomegranate', 'Watermelon Passionfruit', 'Tropical Watermelon', 'Peach Pineapple', 'Strawberry Kiwifruit'] },
      { name: 'Inmood Prism 20K — Replacement Pods (Clear)', badge: 'POD', badgeColor: '#BF00FF', puffs: '20,000 puffs', price: '$20.00', specs: 'Clear transparent pod · 18.5ml', nicotine: '10mg or 28mg', note: 'Requires Inmood Prism Battery Kit (sold separately)', flavours: ['Blueberry', 'Grape Berry', 'Mint', 'Passionfruit Pineapple', 'Peach Blueberry', 'Pineapple', 'Pineapple Lemon', 'Pomegranate Kiwifruit', 'Sour Lemon', 'Strawberry Banana', 'Vanilla Spice'] },
      { name: 'Inmood Prism — Battery Kit', badge: 'DEVICE', badgeColor: '#6b6b90', puffs: 'Device only', price: '$15.00', specs: '1300mAh · USB-C · LED screen · Child lock', nicotine: 'Pods sold separately', note: 'Compatible with all Prism pods', flavours: [] },
      { name: 'Inmood 10K — Starter Kit', badge: 'STARTER KIT', badgeColor: '#FF2079', puffs: '10,000 puffs', price: '$25.00', specs: '15ml · 1.0Ω coil · PG:VG 55:45', nicotine: '26mg/ml (4% Nic Salt)', note: 'All flavours come with an icy cool finish · Includes battery + pod', flavours: ['Pineapple', 'Kiwifruit Pineapple', 'Mango Peach', 'Peach Apple', 'Cherry Pomegranate', 'Raspberry Grape', 'Blueberry Raspberry', 'Strawberry Kiwifruit', 'Banana Mango', 'Pear Lime', 'Cherry Berry', 'Strawberry Blueberry', 'Vanilla Spice', 'Grape Peach', 'Apple Grape', 'Strawberry Raspberry', 'Watermelon Blackberry', 'Blueberry Pomegranate', 'Sour Apple', 'Caramel Custard', 'Blueberry', 'Tobacco', 'Sour Mango', 'Sour Lemon', 'Strawberry Watermelon', 'Mint', 'Menthol', 'Grape Berry'] },
      { name: 'Inmood 10K — Replacement Pods', badge: 'POD', badgeColor: '#FF2079', puffs: '10,000 puffs', price: '$20.00', specs: '15ml · Requires Inmood 10K battery device', nicotine: '26mg/ml (4% Nic Salt)', note: 'All flavours come with an icy cool finish', flavours: ['Pineapple', 'Kiwifruit Pineapple', 'Mango Peach', 'Peach Apple', 'Cherry Pomegranate', 'Raspberry Grape', 'Blueberry Raspberry', 'Strawberry Kiwifruit', 'Banana Mango', 'Pear Lime', 'Cherry Berry', 'Strawberry Blueberry', 'Vanilla Spice', 'Grape Peach', 'Apple Grape', 'Strawberry Raspberry', 'Watermelon Blackberry', 'Blueberry Pomegranate', 'Sour Apple', 'Caramel Custard', 'Blueberry', 'Tobacco', 'Sour Mango', 'Sour Lemon', 'Strawberry Watermelon', 'Mint', 'Menthol', 'Grape Berry'] },
      { name: 'Inmood Prism — Replacement Pods 15K (10mg)', badge: 'POD', badgeColor: '#FF2079', puffs: '15,000 puffs', price: '$20.00', specs: '16ml · Dual mesh coils · Requires Prism Battery Kit', nicotine: '10mg/mL (Low Strength)', note: 'Requires Inmood Prism Battery Kit (sold separately)', flavours: ['Cherry Blueberry', 'Strawberry Blueberry', 'Pineapple Coconut', 'Blueberry Raspberry', 'Sour Apple', 'Strawberry Watermelon', 'Mango Grape', 'Cherry Pomegranate'] },
    ],
  },
  {
    name: 'FREEBASE E-LIQUID', color: '#f59e0b',
    products: [
      { name: 'Slapple 3mg 120ml — Ice Edition', badge: 'FREEBASE', badgeColor: '#f59e0b', puffs: '120ml', price: '$35.00', specs: '3mg freebase · 120ml · Icy finish on all flavours · Sub-ohm ready', nicotine: '3mg/ml Freebase', note: 'All flavours have an icy finish', flavours: ['Apple Pear', 'Blackberry Lemon', 'Blueberry Raspberry', 'Kiwifruit Pineapple', 'Lychee Peach', 'Mango Passionfruit', 'Menthol', 'Orange Guava', 'Pineapple Lemon', 'Sour Lemon', 'Spear Mint', 'Strawberry Watermelon', 'Tropical Berry'] },
      { name: 'Slapple 3mg 120ml — Zero Ice', badge: 'FREEBASE', badgeColor: '#f59e0b', puffs: '120ml', price: '$35.00', specs: '3mg freebase · 120ml · No icy finish · Sub-ohm ready', nicotine: '3mg/ml Freebase', note: 'Smooth flavour — no ice finish', flavours: ['Banana', 'Berries', 'Blueberry Raspberry', 'Caramel Custard', 'Caramel Tobacco', 'Grape', 'Peach Pineapple', 'Strawberry Guava'] },
      { name: 'Cloudys E-Liquid 100ml 3mg', badge: 'FREEBASE', badgeColor: '#f59e0b', puffs: '100ml', price: '$35.00', specs: '3mg freebase · 100ml · Best value size · Sub-ohm ready', nicotine: '3mg/ml Freebase', note: 'Best value — great for sub-ohm devices', flavours: ['Banana Berry', 'Blueberry Menthol', 'Blueberry Raspberry', 'Grape', 'Lemon Lime', 'Mango', 'Mint', 'Passionfruit Lychee', 'Peach', 'Peach Apple', 'Sour Apple', 'Sour Berry', 'Strawberry', 'Sweet Pineapple', 'Vanilla Spice', 'Watermelon'] },
      { name: 'NZ Vapor Juice 0MG 60ml', badge: 'FREEBASE', badgeColor: '#f59e0b', puffs: '60ml', price: '$30.00', specs: '0mg nicotine · 60ml freebase · Nicotine free · Sub-ohm ready', nicotine: '0mg — Nicotine Free', note: 'Zero nicotine freebase', flavours: ['Blackberry', 'Mango Mango', 'Strawberry'] },
      { name: 'NZ Vapor Juice 10MG 60ml', badge: 'FREEBASE', badgeColor: '#f59e0b', puffs: '60ml', price: '$30.00', specs: '10mg freebase · 60ml · Sub-ohm ready · Wide flavour range', nicotine: '10mg/ml Freebase', note: 'Medium strength freebase', flavours: ['Banana Caramel', 'Blackberry', 'ESP-Resso', 'Kiwifruit Watermelon', 'Mango Mango', 'Menthol', 'Menthol Tobacco', 'Peach Passionfruit', 'Raspberry Pineapple', 'Strawberry', 'Sweet Pineapple', 'Tobacco (Red)', 'Tobacco (Gold)', 'Tobacco Latte', 'Tobacco Vanilla', 'Tobacco Silver', 'Tobacco (Purple)', 'Tobacco (Blue)', 'Tropical', 'Watermelon Peach'] },
      { name: 'NZ Vapor Juice 15MG 60ml', badge: 'FREEBASE', badgeColor: '#f59e0b', puffs: '60ml', price: '$30.00', specs: '15mg freebase · 60ml · Sub-ohm ready · Wide flavour range', nicotine: '15mg/ml Freebase', note: 'Higher strength freebase', flavours: ['Banana Caramel', 'Blackberry', 'ESP-Resso', 'Kiwifruit Watermelon', 'Mango Mango', 'Menthol', 'Menthol Tobacco', 'Peach Passionfruit', 'Raspberry Pineapple', 'Sweet Pineapple', 'Tobacco Blue', 'Tobacco Latte', 'Tobacco Red', 'Tobacco Vanilla', 'Tobacco Silver', 'Tobacco (Gold)', 'Tobacco (Purple)', 'Tropical', 'Watermelon Peach'] },
    ],
  },
  {
    name: 'NIC SALT 30ML', color: '#00e5ff',
    products: [
      { name: 'Slapple E-Liquid 20mg 30ml', badge: 'NIC SALT', badgeColor: '#00e5ff', puffs: '30ml', price: '$25.00', specs: '20mg nicotine salt · 30ml · Made for pod systems', nicotine: '20mg/ml Nic Salt', note: 'Mix of Ice & Zero Ice flavours', flavours: ['Banana (Zero Ice)', 'Berries (Zero Ice)', 'Blackberry Lemon', 'Blueberry Raspberry', 'Blueberry Raspberry (Zero Ice)', 'Caramel Custard', 'Caramel Tobacco (Zero Ice)', 'Kiwifruit Pineapple', 'Lychee Peach', 'Peach Pineapple (Zero Ice)', 'Pineapple Lemon', 'Sour Lemon', 'Strawberry Watermelon', 'Strawberry Guava (Zero Ice)', 'Tropical Berry'] },
      { name: 'Slapple E-Liquid 10mg 30ml', badge: 'NIC SALT', badgeColor: '#00e5ff', puffs: '30ml', price: '$25.00', specs: '10mg nicotine salt · 30ml · Lower strength · Made for pod systems', nicotine: '10mg/ml Nic Salt', note: 'Mix of Ice & Zero Ice flavours', flavours: ['Banana (Zero Ice)', 'Berries (Zero Ice)', 'Blackberry Lemon', 'Blueberry Raspberry', 'Blueberry Raspberry (Zero Ice)', 'Caramel Custard', 'Caramel Tobacco (Zero Ice)', 'Kiwifruit Pineapple', 'Lychee Peach', 'Peach Pineapple (Zero Ice)', 'Pineapple Lemon', 'Sour Lemon', 'Strawberry Watermelon', 'Strawberry Guava (Zero Ice)', 'Tropical Berry'] },
      {
        name: 'Cloudys E-Liquid 30ml Nic Salt', badge: 'NIC SALT', badgeColor: '#00e5ff', puffs: '30ml', price: '$25.00', specs: '30ml · Nic Salt · Pod systems & low wattage devices', nicotine: 'Available in 3 strengths', note: 'Choose your nicotine strength below', flavours: ['Banana Berry', 'Blueberry Menthol', 'Blueberry Raspberry', 'Grape', 'Lemon Lime', 'Mango', 'Menthol', 'Mint', 'Nut Tobacco', 'Passionfruit Lychee', 'Peach', 'Peach Apple', 'Sour Apple', 'Sour Berry', 'Strawberry', 'Tobacco', 'Vanilla Spice', 'Watermelon'],
        variants: [
          { strength: '11mg', nicSalt: '20mg Nic Salt', note: 'Smooth — ideal for new vapers', color: '#4ade80' },
          { strength: '20mg', nicSalt: '35mg Nic Salt', note: 'Medium — most popular choice', color: '#f472b6' },
          { strength: '28mg', nicSalt: '50mg Nic Salt', note: 'High — for heavy smokers', color: '#f87171' },
        ]
      },
      {
        name: 'Cloudys Premium E-Liquid 30ml', badge: 'NIC SALT', badgeColor: '#f472b6', puffs: '30ml', price: '$25.00', specs: '30ml · Premium Nic Salt · Pod systems & low wattage devices', nicotine: 'Available in 3 strengths', note: 'Choose your nicotine strength below', flavours: ['Banana Berry', 'Blueberry Menthol', 'Blueberry Raspberry', 'Grape', 'Lemon Lime', 'Mango', 'Menthol', 'Mint', 'Nut Tobacco', 'Passionfruit Lychee', 'Peach', 'Peach Apple', 'Sour Apple', 'Sour Berry', 'Strawberry', 'Tobacco', 'Vanilla Spice', 'Watermelon'],
        variants: [
          { strength: '11mg', nicSalt: '20mg Nic Salt', note: 'Smooth — ideal for new vapers', color: '#4ade80' },
          { strength: '20mg', nicSalt: '35mg Nic Salt', note: 'Medium — most popular choice', color: '#f472b6' },
          { strength: '28mg', nicSalt: '50mg Nic Salt', note: 'High — for heavy smokers', color: '#f87171' },
        ]
      },
      { name: 'NZ Vapor Nic Salts 30ml', badge: 'NIC SALT', badgeColor: '#00e5ff', puffs: '30ml', price: '$10.00', specs: 'Nic salt · 30ml · Pod systems · NZ made', nicotine: 'Nic Salt', note: 'Locally made NZ brand', flavours: ['Fizz Berry', 'Grape Ice', 'Premium Blue', 'Aloe Pear', 'Arctic Ice', 'Blackcurrant Ice', 'Peach Ice', 'Perfectly Mint', 'Premium Gold', 'Premium Red', 'Premium Silver', 'Razz Ripple', 'Royale Vape', 'Stoney Fruits', 'Strawberry'] },
    ],
  },
  {
    name: 'SOLO', color: '#ef4444',
    products: [
      { name: 'SOLO Ultra Kit 12K', badge: 'STARTER KIT', badgeColor: '#ef4444', puffs: '12,000 puffs', price: '$30.00', specs: 'Ultra device · 12,000 puffs · Rechargeable · USB-C · Includes battery + pod', nicotine: '20mg/ml', note: 'Includes battery + pod', flavours: ['Blueberry Raspberry', 'Cherry Pomegranate', 'Cherry Sweet', 'Sour Apple', 'Sour Grape', 'Tropical Passionfruit'] },
      { name: 'SOLO Ultra Pod 12K', badge: 'POD', badgeColor: '#ef4444', puffs: '12,000 puffs', price: '$20.00', specs: 'Ultra replacement pod · 12,000 puffs · Requires SOLO Ultra Device', nicotine: '20mg/ml', note: 'Requires SOLO Ultra Device (sold separately)', flavours: ['Blueberry Raspberry', 'Cherry Pomegranate', 'Cherry Sweet', 'Kiwifruit Pineapple', 'Lemon Lime', 'Lemon Tea', 'Raspberry Lime', 'Sour Apple', 'Sour Grape', 'Strawberry Watermelon', 'Sweet Banana', 'Sweet Lychee', 'Sweet Peach'] },
      { name: 'SOLO Ultra Device', badge: 'DEVICE', badgeColor: '#6b6b90', puffs: 'Device only', price: '$15.00', specs: 'SOLO Ultra battery device · USB-C · Compatible with SOLO Ultra pods', nicotine: 'Pods sold separately', note: 'Black only', flavours: [] },
      { name: 'SOLO Plus Pods', badge: 'POD', badgeColor: '#ef4444', puffs: '—', price: '$20.00', specs: 'SOLO Plus replacement pods · Compatible with SOLO Plus device', nicotine: '20mg/ml', note: 'Pod only', flavours: ['Banana', 'Blueberry Raspberry', 'Grape Mint', 'Menthol', 'Mint', 'Passionfruit', 'Peach Mint', 'Peppermint', 'Sour Apple', 'Sour Lime', 'Sour Raspberry', 'Spearmint', 'Strawberry Mint', 'Tobacco', 'Watermelon Mint'] },
    ],
  },
  {
    name: 'ALT', color: '#818cf8',
    products: [
      { name: 'Alt Single Pods', badge: 'POD', badgeColor: '#818cf8', puffs: '—', price: '$10.00', specs: 'Alt single replacement pod · For Alt POD device', nicotine: '20mg/ml', note: 'Compatible with Alt POD device', flavours: ['Aqua Mint', 'Gold Tobacco', 'Grape Mint', 'Mango Ice', 'Menthol Ice', 'Peach Ice', 'Pineapple', 'Strawberry Ice'] },
      { name: 'Alt. Replacement Pods 2%', badge: 'POD', badgeColor: '#818cf8', puffs: '—', price: '$19.99', specs: 'Alt 2% replacement pods · 2-pack', nicotine: '2% (20mg/ml)', note: 'Pod 2-pack', flavours: ['Menthol', 'Mint', 'Sweet Tobacco', 'Tobacco'] },
      { name: 'Alt. Replacement Pods 2.85%', badge: 'POD', badgeColor: '#818cf8', puffs: '—', price: '$19.99', specs: 'Alt 2.85% replacement pods · 2-pack', nicotine: '2.85% (28.5mg/ml)', note: 'Mid strength pods', flavours: ['Menthol', 'Menthol Spearmint', 'Mint', 'Peppermint', 'Spearmint'] },
      { name: 'Alt. Nu Pods 2%', badge: 'POD', badgeColor: '#818cf8', puffs: '—', price: '$19.99', specs: 'Alt Nu pods · 2% strength · Wide flavour range', nicotine: '2% (20mg/ml)', note: 'Nu range pods', flavours: ['Apple', 'Blackberry Mint', 'Cream Mint', 'Grape Mint', 'Guava Kiwifruit', 'Kiwifruit Strawberry', 'Lemon', 'Menthol Mint', 'Orange', 'Peach Mint', 'Pineapple Mint', 'Spearmint Mint', 'Strawberry Lemon', 'Strawberry Mint', 'Strawberry Watermelon', 'Sweet Mango', 'Sweet Menthol', 'Sweet Tobacco', 'Sweet Vanilla'] },
      { name: 'Alt. Nu Pods 2.85%', badge: 'POD', badgeColor: '#818cf8', puffs: '—', price: '$19.99', specs: 'Alt Nu pods · 2.85% strength · Wide flavour range', nicotine: '2.85% (28.5mg/ml)', note: 'Mid strength Nu range pods', flavours: ['Apple', 'Blackberry Mint', 'Cream Mint', 'Grape Mint', 'Guava Kiwifruit', 'Kiwifruit Strawberry', 'Lemon', 'Menthol Mint', 'Orange', 'Peach Mint', 'Pineapple Mint', 'Spearmint Mint', 'Strawberry Lemon', 'Strawberry Mint', 'Strawberry Watermelon', 'Sweet Mango', 'Sweet Menthol', 'Sweet Tobacco', 'Sweet Vanilla'] },
      { name: 'Alt.X Pods', badge: 'POD', badgeColor: '#818cf8', puffs: '—', price: '$20.00', specs: 'Alt.X replacement pods · For Alt.X device', nicotine: '20mg/ml', note: 'Compatible with Alt.X device', flavours: ['Apple', 'Blackberry', 'Grape', 'Guava Kiwifruit', 'Kiwifruit Strawberry', 'Menthol', 'Mint (Chill)', 'Mint (Spring)', 'Peach', 'Pineapple', 'Strawberry', 'Strawberry Lemon', 'Strawberry Watermelon', 'Tobacco'] },
      { name: 'Alt.X Device', badge: 'DEVICE', badgeColor: '#6b6b90', puffs: 'Device only', price: '$15.00', specs: 'Alt.X battery device · USB-C · Compatible with Alt.X pods', nicotine: 'Pods sold separately', note: 'Black only', flavours: [] },
      { name: 'Alt Battery', badge: 'DEVICE', badgeColor: '#6b6b90', puffs: 'Device only', price: '$14.99', specs: 'Alt battery device · Compatible with Alt single pods', nicotine: 'Pods sold separately', note: 'Available in Aurora, Black, Comet, Midnight', flavours: [] },
    ],
  },
  {
    name: 'BUD', color: '#a3e635',
    products: [
      { name: 'Bud 2.8% Pod Kit', badge: 'STARTER KIT', badgeColor: '#a3e635', puffs: '—', price: '$25.00', specs: '2.8% nicotine · Pod kit · Rechargeable · Includes battery + pod', nicotine: '2.8% (28mg/ml)', note: 'Includes battery + pod', flavours: ['Blueberry Raspberry', 'Cherry Pomegranate', 'Grape Mint', 'Mint', 'Strawberry Kiwifruit', 'Watermelon Mint'] },
      { name: 'Bud Pods 2.8% — Pack of 2', badge: 'POD', badgeColor: '#a3e635', puffs: '—', price: '$24.99', specs: '2.8% nicotine · Pack of 2 pods · Replacement pods for Bud device', nicotine: '2.8% (28mg/ml)', note: 'Pack of 2 pods — battery sold separately', flavours: ['Banana', 'Blueberry Raspberry', 'Cherry Pomegranate', 'Citrus', 'Grape Mint', 'Lemon Lime', 'Mango', 'Mango Watermelon', 'Mint', 'Passionfruit Sour', 'Peppermint', 'Sour Apple', 'Sour Lychee', 'Sour Orange', 'Sour Pineapple', 'Spearmint', 'Strawberry Kiwifruit', 'Strawberry Passionfruit', 'Strawberry Watermelon', 'Sweet Ice', 'Tobacco', 'Watermelon Mint'] },
      { name: 'Bud Battery', badge: 'DEVICE', badgeColor: '#6b6b90', puffs: 'Device only', price: '$14.99', specs: 'Bud battery device · Compatible with Bud pods', nicotine: 'Pods sold separately', note: 'Cream colour only', flavours: [] },
    ],
  },
  {
    name: 'GRABIT', color: '#f97316',
    products: [
      { name: 'Grabit Nex+ Starter Kit', badge: 'STARTER KIT', badgeColor: '#f97316', puffs: '—', price: '$10.00', specs: 'Rechargeable · USB-C · Refillable pod system · Includes battery + pod', nicotine: '20mg/ml', note: 'Includes battery + pod', flavours: ['Banana', 'Blueberry Raspberry', 'Cherry Pomegranate', 'Mango', 'Mango Pineapple', 'Menthol', 'Mint', 'Passionfruit Guava', 'Peach Pineapple', 'Pineapple Kiwifruit', 'Plum', 'Sour Apple', 'Sour Grape', 'Sour Lemon', 'Sour Raspberry', 'Spearmint', 'Strawberry Kiwifruit', 'Strawberry Passionfruit', 'Strawberry Watermelon', 'Tobacco', 'Vanilla Spice', 'Watermelon Mint'] },
      { name: 'Grabit Nex+ Replacement Pods', badge: 'POD', badgeColor: '#f97316', puffs: '—', price: '$10.00', specs: 'Fits Grabit Nex+ battery kit · Replacement pod', nicotine: '20mg/ml', note: 'Pod only — battery sold separately', flavours: ['Banana', 'Blueberry Raspberry', 'Cherry Pomegranate', 'Mango', 'Mango Pineapple', 'Menthol', 'Mint', 'Passionfruit Guava', 'Peach Pineapple', 'Pineapple Kiwifruit', 'Plum', 'Sour Apple', 'Sour Grape', 'Sour Lemon', 'Sour Raspberry', 'Spearmint', 'Strawberry Kiwifruit', 'Strawberry Passionfruit', 'Strawberry Watermelon', 'Tobacco', 'Vanilla Spice', 'Watermelon Mint'] },
      { name: 'Grabit Unique 26K Puffs Pod', badge: 'POD', badgeColor: '#f97316', puffs: '26,000 puffs', price: '$20.00', specs: '26,000 puffs · Pre-filled pod · Rechargeable', nicotine: '20mg/ml', note: 'Long-lasting pod system', flavours: ['Blackberry Apple', 'Blackberry Licorice', 'Blueberry Cherry', 'Blueberry Raspberry', 'Cherry Pomegranate', 'Grape Berry', 'Grape Peach', 'Mango Tropical', 'Pineapple Kiwifruit', 'Pineapple Coconut', 'Strawberry Cream', 'Strawberry Pear'] },
    ],
  },
  {
    name: 'IGET', color: '#38bdf8',
    products: [
      { name: 'IGET Bar 3500 Puffs Disposable', badge: 'DISPOSABLE', badgeColor: '#38bdf8', puffs: '3,500 puffs', price: '$28.00', specs: '2% nicotine · Pre-filled disposable · No charging required', nicotine: '2% (20mg/ml)', note: 'Single use disposable — ready to use', flavours: ['Apple', 'Banana', 'Blackberry', 'Blueberry', 'Blueberry Raspberry', 'Cherry Blueberry', 'Cherry Pomegranate', 'Grape', 'Kiwifruit Pineapple', 'Mango', 'Mint', 'Passionfruit Watermelon', 'Peach', 'Raspberry Grape', 'Strawberry Lemon', 'Strawberry Raspberry', 'Strawberry Watermelon', 'Strawberry Kiwifruit', 'Watermelon', 'Watermelon Mint'] },
      { name: 'IGET Moon Disposable 5000 Puffs', badge: 'DISPOSABLE', badgeColor: '#38bdf8', puffs: '5,000 puffs', price: '$30.00', specs: '2% nicotine · Pre-filled disposable · No charging required', nicotine: '2% (20mg/ml)', note: 'Single use disposable — ready to use', flavours: ['Banana', 'Blackberry', 'Blueberry Raspberry', 'Cherry Blueberry', 'Cherry Pear', 'Grape', 'Mango', 'Mint', 'Passionfruit Lychee', 'Peach', 'Peach Apple', 'Pineapple Coconut', 'Pineapple Kiwifruit', 'Pomegranate Kiwifruit', 'Raspberry Grape', 'Sour Apple', 'Strawberry Kiwifruit', 'Strawberry Raspberry', 'Strawberry Watermelon', 'Tobacco', 'Watermelon'] },
      { name: 'IGET 5000 Puffs Disposable', badge: 'DISPOSABLE', badgeColor: '#38bdf8', puffs: '5,000 puffs', price: '$35.00', specs: '2% nicotine · Pre-filled disposable · Ice flavours', nicotine: '2% (20mg/ml)', note: 'All ice flavours for extra cool hit', flavours: ['Banana Ice', 'Blueberry Raspberry Ice', 'Double Apple', 'Dragon Fruit Lemon Ice', 'Grape Ice', 'Melon Pineapple Orange', 'Passionfruit Kiwi Guava Ice', 'Passionfruit Lychee', 'Peach Apple Ice', 'Pineapple Kiwi Ice', 'Pomegranate Kiwi Ice', 'Strawberry Kiwi Ice', 'Strawberry Orange Green Ice', 'Strawberry Watermelon Ice', 'Watermelon Apple', 'Watermelon Ice'] },
      { name: 'IGET Stick Disposable', badge: 'DISPOSABLE', badgeColor: '#38bdf8', puffs: '—', price: '$35.00', specs: '2% nicotine · Slim stick design · Pre-filled disposable', nicotine: '2% (20mg/ml)', note: 'Slim & discreet design', flavours: ['Aloe Mango', 'Aloe Mango Cantaloupe', 'Blackberry Ice', 'Blue Razz', 'Blueberry', 'Blueberry Raspberry Grape Ice', 'Cola Ice', 'Grape Ice', 'Lush Ice', 'Mango Banana', 'Orange Melon', 'Passion Fruit Mango Ice', 'Passion Fruit Melon Ice', 'Passionfruit', 'Peach Guava', 'Peach Pineapple', 'Peach Strawberry Ice', 'Pineapple Watermelon', 'Pink Lemon Orange', 'Raspberry Watermelon', 'Strawberry Kiwi', 'Strawberry Watermelon', 'Watermelon Kiwi', 'Watermelon Kiwi Pomegranate'] },
      { name: 'IGET 6000 Starter Kit', badge: 'STARTER KIT', badgeColor: '#38bdf8', puffs: '6,000 puffs', price: '$30.00', specs: 'Rechargeable · USB-C · Pre-filled pod · 6,000 puffs', nicotine: '20mg/ml', note: 'Includes battery + pod', flavours: ['Apple', 'Apple Grape', 'Apple Grape Ice', 'Banana', 'Banana Ice', 'Banana Pineapple', 'Blackberry', 'Blueberry', 'Blueberry Raspberry', 'Cherry Pomegranate', 'Cola Ice', 'Double Apple', 'Grape', 'Grape Peach', 'Grape Peach Ice', 'Grape Ice', 'Kiwi Pineapple Ice', 'Lychee Watermelon', 'Mango', 'Melon Ice', 'Mint', 'Orange Grapefruit Lemon', 'Orange Lemon', 'Passionfruit Kiwi Guava', 'Pineapple Banana', 'Pineapple Kiwifruit', 'Raspberry Berry', 'Strawberry Kiwi Ice', 'Strawberry Kiwifruit', 'Strawberry Raspberry', 'Strawberry Watermelon', 'Tobacco', 'Watermelon', 'Watermelon Ice', 'Watermelon Mint', 'Watermelon Mint Ice'] },
      { name: 'IGET 6000 Replacement Pods', badge: 'POD', badgeColor: '#38bdf8', puffs: '6,000 puffs', price: '$15.00', specs: 'Fits IGET 6000 battery device · Pre-filled replacement pod', nicotine: '20mg/ml', note: 'Pod only — battery sold separately', flavours: ['Apple', 'Apple Grape', 'Apple Grape Ice', 'Banana', 'Banana Ice', 'Banana Pineapple', 'Blackberry', 'Blueberry', 'Blueberry Raspberry', 'Cherry Pomegranate', 'Cola Ice', 'Double Apple', 'Grape', 'Grape Peach', 'Grape Peach Ice', 'Grape Ice', 'Kiwi Pineapple Ice', 'Lychee Watermelon', 'Mango', 'Melon Ice', 'Mint', 'Orange Grapefruit Lemon', 'Orange Lemon', 'Passionfruit Kiwi Guava', 'Pineapple Banana', 'Pineapple Kiwifruit', 'Raspberry Berry', 'Strawberry Kiwi Ice', 'Strawberry Kiwifruit', 'Strawberry Raspberry', 'Strawberry Watermelon', 'Tobacco', 'Watermelon', 'Watermelon Ice', 'Watermelon Mint', 'Watermelon Mint Ice'] },
      { name: 'IGET Bar Plus 2.0 Kit 6000', badge: 'STARTER KIT', badgeColor: '#38bdf8', puffs: '6,000 puffs', price: '$30.00', specs: 'Bar Plus 2.0 · Rechargeable · USB-C · Includes battery + pod', nicotine: '20mg/ml', note: 'Includes battery + pod', flavours: ['Apple', 'Apple Grape', 'Banana', 'Blackberry', 'Blueberry', 'Grape', 'Grape Peach', 'Mango', 'Mint', 'Orange Lemon', 'Pineapple Banana', 'Pineapple Kiwifruit', 'Strawberry Kiwifruit', 'Strawberry Raspberry', 'Strawberry Watermelon', 'Tobacco', 'Watermelon', 'Watermelon Mint'] },
      { name: 'IGET Bar Plus Battery', badge: 'DEVICE', badgeColor: '#6b6b90', puffs: 'Device only', price: '$15.00', specs: 'Bar Plus battery device · USB-C · Compatible with Bar Plus pods', nicotine: 'Pods sold separately', note: 'Compatible with all Bar Plus pods', flavours: [] },
      { name: 'IGET Bar Plus 3.0 Battery', badge: 'DEVICE', badgeColor: '#6b6b90', puffs: 'Device only', price: '$15.00', specs: 'Bar Plus 3.0 battery device · USB-C · Upgraded device', nicotine: 'Pods sold separately', note: 'Compatible with Bar Plus 3.0 pods', flavours: [] },
      { name: 'IGET V3 Kit', badge: 'STARTER KIT', badgeColor: '#38bdf8', puffs: '10,000 puffs', price: '$30.00', specs: 'V3 pod system · Rechargeable · USB-C · Includes battery + pod', nicotine: '20mg/ml', note: 'Includes battery + pod', flavours: ['Blueberry Peach', 'Blueberry Cherry', 'Cherry Blackberry', 'Cherry Pomegranate', 'Grape Berry', 'Mango Guava', 'Pineapple Kiwifruit', 'Pomegranate Kiwifruit', 'Raspberry Lime', 'Strawberry Lychee', 'Watermelon Passionfruit', 'Lemon Pineapple'] },
      { name: 'IGET V4 Battery Kit', badge: 'DEVICE', badgeColor: '#6b6b90', puffs: 'Device only', price: '$15.00', specs: 'V4 battery device · USB-C · Latest IGET device', nicotine: 'Pods sold separately', note: 'Compatible with V4 pods', flavours: [] },
      { name: 'IGET 10000 Puffs Pod', badge: 'POD', badgeColor: '#38bdf8', puffs: '10,000 puffs', price: '$20.00', specs: 'Pre-filled pod · 10,000 puffs · Rechargeable', nicotine: '20mg/ml', note: 'Pod only — requires compatible battery', flavours: ['Apple Banana', 'Blueberry Cherry', 'Blueberry Kiwifruit', 'Blueberry Peach', 'Caramel Lemon', 'Cherry Blackberry', 'Cherry Pomegranate', 'Grape Berry', 'Grape Menthol', 'Grape Pomegranate', 'Lemon Pineapple', 'Mango Guava', 'Peach Lychee', 'Pineapple Kiwifruit', 'Pineapple Passionfruit', 'Pomegranate Kiwifruit', 'Raspberry Lime', 'Strawberry Lychee', 'Strawberry Raspberry', 'Watermelon Passionfruit'] },
      { name: 'IGET Luna Kit 13K', badge: 'STARTER KIT', badgeColor: '#38bdf8', puffs: '13,000 puffs', price: '$35.00', specs: 'Luna device · 13,000 puffs · Rechargeable · USB-C · Includes battery + pod', nicotine: '20mg/ml', note: 'Includes battery + pod', flavours: ['Apple', 'Banana', 'Blackberry', 'Blackberry Pomegranate', 'Blueberry Raspberry', 'Caramel Lemon', 'Cherry Lime', 'Citrus Berry', 'Grape', 'Grape Berry', 'Lemon', 'Mango', 'Mango Tropical', 'Mint', 'Orange', 'Passionfruit Lychee', 'Peach Apple', 'Peach Pineapple', 'Pineapple Coconut', 'Pineapple Kiwifruit', 'Pomegranate Kiwifruit', 'Strawberry Cream', 'Strawberry Kiwifruit', 'Strawberry Raspberry', 'Strawberry Watermelon', 'Sweet Grape', 'Vanilla Custard', 'Watermelon', 'Watermelon Pineapple'] },
      { name: 'IGET Luna Pod 13K', badge: 'POD', badgeColor: '#38bdf8', puffs: '13,000 puffs', price: '$20.00', specs: 'Luna pre-filled pod · 13,000 puffs · Requires Luna Battery Kit', nicotine: '20mg/ml', note: 'Requires Luna Battery Kit (sold separately)', flavours: ['Apple', 'Banana', 'Blackberry', 'Blackberry Pomegranate', 'Blueberry Raspberry', 'Caramel Lemon', 'Cherry Lime', 'Citrus Berry', 'Grape', 'Grape Berry', 'Lemon', 'Mango', 'Mango Tropical', 'Mint', 'Orange', 'Passionfruit Lychee', 'Peach Apple', 'Peach Pineapple', 'Pineapple Coconut', 'Pineapple Kiwifruit', 'Pomegranate Kiwifruit', 'Strawberry Cream', 'Strawberry Kiwifruit', 'Strawberry Raspberry', 'Strawberry Watermelon', 'Sweet Grape', 'Vanilla Custard', 'Watermelon', 'Watermelon Pineapple'] },
      { name: 'IGET Luna Battery Kit', badge: 'DEVICE', badgeColor: '#6b6b90', puffs: 'Device only', price: '$15.00', specs: 'Luna battery device · USB-C · Compatible with Luna pods', nicotine: 'Pods sold separately', note: 'Compatible with all Luna pods', flavours: [] },
      { name: 'IGET Edge Kit', badge: 'STARTER KIT', badgeColor: '#38bdf8', puffs: '—', price: '$30.00', specs: 'Edge pod system · Rechargeable · USB-C · Includes battery + pod', nicotine: '20mg/ml', note: 'Includes battery + pod', flavours: ['Apple Kiwifruit', 'Blackberry Cherry', 'Blackberry Pear', 'Blueberry Raspberry', 'Cherry Pomegranate', 'Grape Berry', 'Grape Peach', 'Kiwifruit Guava', 'Kiwifruit Pineapple', 'Lemon Passionfruit', 'Lime Mango', 'Mint', 'Peach Mango', 'Peach Pineapple', 'Spearmint', 'Strawberry Kiwifruit', 'Strawberry Raspberry', 'Strawberry Watermelon', 'Tropical', 'Tropical Citrus'] },
      { name: 'IGET Edge Pods', badge: 'POD', badgeColor: '#38bdf8', puffs: '—', price: '$20.00', specs: 'Edge replacement pod · Fits Edge battery device', nicotine: '20mg/ml', note: 'Pod only — requires Edge battery', flavours: ['Apple Kiwifruit', 'Blackberry Cherry', 'Blackberry Pear', 'Blueberry Raspberry', 'Cherry Pomegranate', 'Grape Berry', 'Grape Peach', 'Kiwifruit Guava', 'Kiwifruit Pineapple', 'Lemon Passionfruit', 'Lime Mango', 'Mint', 'Peach Mango', 'Peach Pineapple', 'Spearmint', 'Strawberry Kiwifruit', 'Strawberry Raspberry', 'Strawberry Watermelon', 'Tobacco', 'Tropical', 'Tropical Citrus'] },
      { name: 'IGET Edge 15K Kit', badge: 'STARTER KIT', badgeColor: '#38bdf8', puffs: '15,000 puffs', price: '$35.00', specs: 'Edge 15K · Rechargeable · USB-C · 15,000 puffs · Includes battery + pod', nicotine: '20mg/ml', note: 'Includes battery + pod', flavours: ['Apple Kiwifruit', 'Blackberry Cherry', 'Blackberry Pear', 'Blackberry Berry', 'Blueberry Cherry', 'Blueberry Raspberry', 'Cherry Pomegranate', 'Grape Berry', 'Grape Peach', 'Kiwifruit Guava', 'Kiwifruit Pineapple', 'Lemon Passionfruit', 'Lime Mango', 'Mango Banana', 'Mint', 'Orange Kiwifruit', 'Passionfruit Pomegranate', 'Peach Mango', 'Peach Pineapple', 'Pineapple Berry', 'Spearmint', 'Strawberry Kiwifruit', 'Strawberry Pineapple', 'Strawberry Raspberry', 'Strawberry Watermelon', 'Sweet Grape', 'Tobacco', 'Tropical', 'Tropical Citrus'] },
      { name: 'IGET Edge 15K Pods', badge: 'POD', badgeColor: '#38bdf8', puffs: '15,000 puffs', price: '$25.00', specs: 'Edge 15K replacement pod · Requires Edge battery device', nicotine: '20mg/ml', note: 'Pod only — requires Edge battery device', flavours: ['Apple Kiwifruit', 'Blackberry Cherry', 'Blackberry Pear', 'Blackberry Berry', 'Blueberry Cherry', 'Blueberry Raspberry', 'Cherry Pomegranate', 'Grape Berry', 'Grape Peach', 'Kiwifruit Guava', 'Kiwifruit Pineapple', 'Lemon Passionfruit', 'Lime Mango', 'Mango Banana', 'Mint', 'Orange Kiwifruit', 'Passionfruit Pomegranate', 'Peach Mango', 'Peach Pineapple', 'Pineapple Berry', 'Spearmint', 'Strawberry Kiwifruit', 'Strawberry Pineapple', 'Strawberry Raspberry', 'Strawberry Watermelon', 'Sweet Grape', 'Tobacco', 'Tropical', 'Tropical Citrus'] },
      { name: 'IGET Edge Battery', badge: 'DEVICE', badgeColor: '#6b6b90', puffs: 'Device only', price: '$15.00', specs: 'Edge battery device · USB-C · Compatible with Edge pods', nicotine: 'Pods sold separately', note: 'Compatible with all Edge pods', flavours: [] },
      { name: 'IGET Bar Plus 4.0 Kit', badge: 'STARTER KIT', badgeColor: '#38bdf8', puffs: '—', price: '$35.00', specs: 'Bar Plus 4.0 · Latest generation · Rechargeable · USB-C · Includes battery + pod', nicotine: '20mg/ml', note: 'Includes battery + pod', flavours: ['Apple Cinnamon', 'Blackberry Grape', 'Blackberry Tropical', 'Blueberry Raspberry', 'Cherry Pomegranate', 'Grape Berry', 'Grape Kiwifruit', 'Guava Lime', 'Pineapple Kiwifruit', 'Pineapple Lemon', 'Strawberry Custard', 'Strawberry Kiwifruit', 'Watermelon Passionfruit'] },
      { name: 'IGET Bar Plus 4.0 Pods', badge: 'POD', badgeColor: '#38bdf8', puffs: '—', price: '$25.00', specs: 'Bar Plus 4.0 replacement pod · Fits Bar Plus 4.0 Kit', nicotine: '20mg/ml', note: 'Pod only — requires Bar Plus 4.0 battery', flavours: ['Blackberry Grape', 'Blackberry Tropical', 'Blueberry Raspberry', 'Cherry Pomegranate', 'Grape Berry', 'Grape Kiwifruit', 'Guava Lime', 'Passionfruit Lychee', 'Peach Apple', 'Pineapple Coconut', 'Pineapple Kiwifruit', 'Pineapple Lemon', 'Raspberry Lemon', 'Strawberry Banana', 'Strawberry Custard', 'Strawberry Kiwifruit', 'Strawberry Watermelon'] },
      { name: 'IGET E-Liquid 28.5mg', badge: 'E-LIQUID', badgeColor: '#a78bfa', puffs: '—', price: '$35.00', specs: 'Nic salt e-liquid · 28.5mg · Compatible with pod systems', nicotine: '28.5mg (Nic Salt)', note: 'High strength nic salt', flavours: ['Apple', 'Blueberry Raspberry', 'Cherry Pomegranate', 'Grape', 'Kiwifruit Passionfruit', 'Kiwifruit Pineapple', 'Lemon Pineapple', 'Mango', 'Pineapple Coconut', 'Raspberry Peach', 'Strawberry Peach', 'Strawberry Watermelon', 'Tropical'] },
    ],
  },
]
type ProductVariant = { strength: string; nicSalt: string; note: string; color: string }
type Product = typeof BRANDS[0]['products'][0] & { variants?: ProductVariant[] }


/* ─── App ────────────────────────────────────────────────────── */
export default function Home() {
  const [ageOk, setAgeOk] = useState(false)

  if (!ageOk) return <AgeGate onConfirm={() => setAgeOk(true)} />
  return (
    <main style={{ background: '#000', margin: 0, padding: 0 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@400;700;900&display=swap');

        * { font-family: 'Aharoni', 'Arial Black', Arial, sans-serif; box-sizing:border-box; }
        :root { --font-aharoni: 'Aharoni', 'Exo 2', 'Arial Black', sans-serif; }
        html { scroll-behavior: smooth; }

        @keyframes pulse { 0%,100%{opacity:0.3} 50%{opacity:1} }
        @keyframes blob1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(18px,-10px) scale(1.08)} 66%{transform:translate(-10px,8px) scale(0.95)} }
        @keyframes blob2 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-14px,12px) scale(1.05)} 66%{transform:translate(10px,-8px) scale(0.97)} }
        @keyframes blob3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(8px,10px) scale(1.1)} }
        @keyframes navReveal { from{opacity:0;transform:translateY(-12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes floatOrb1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(60px,-40px) scale(1.15)} 66%{transform:translate(-30px,30px) scale(0.9)} }
        @keyframes floatOrb2 { 0%,100%{transform:translate(0,0) scale(1)} 40%{transform:translate(-80px,50px) scale(1.2)} 70%{transform:translate(40px,-20px) scale(0.85)} }
        @keyframes liq1 { 0%,100%{transform:translate(0,0) scale(1)} 30%{transform:translate(22px,-18px) scale(1.2)} 65%{transform:translate(-14px,12px) scale(0.85)} }
        @keyframes liq2 { 0%,100%{transform:translate(0,0) scale(1)} 40%{transform:translate(-20px,22px) scale(1.15)} 75%{transform:translate(16px,-10px) scale(0.9)} }
        @keyframes liq3 { 0%,100%{transform:translate(0,0) scale(1)} 55%{transform:translate(10px,18px) scale(1.1)} }
        @keyframes liq4 { 0%,100%{transform:translate(0,0) scale(1)} 45%{transform:translate(-8px,-14px) scale(1.18)} }
        @keyframes cardIn { from{opacity:0;transform:translateY(28px) scale(0.96)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes modalIn { from{opacity:0;transform:scale(0.94) translateY(16px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes rippleOut { 0%{transform:scale(0);opacity:0.6} 100%{transform:scale(5);opacity:0} }
        @keyframes heroFadeIn { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes chevronFade { 0%,100%{opacity:0;transform:translateY(-4px)} 50%{opacity:0.8;transform:translateY(2px)} }

        /* Nav */
        .nav-link { font-family:'Aharoni','Arial Black',sans-serif; font-size:clamp(8px,1vw,10px); letter-spacing:0.3em; color:rgba(240,237,230,0.5); text-decoration:none; font-weight:700; transition:color 0.25s; white-space:nowrap; position:relative; z-index:3; }
        .nav-link:hover { color:#B8E8EE; }
        .nav-dot { width:3px;height:3px;border-radius:50%;background:rgba(0,229,255,0.35);flex-shrink:0;position:relative;z-index:3; }

        /* Glass card */
        .gc { position:relative; width:220px; min-height:310px; flex-shrink:0; border-radius:20px; overflow:hidden; cursor:pointer; border:1px solid rgba(255,255,255,0.18); transition:transform 0.4s cubic-bezier(.23,1,.32,1), box-shadow 0.4s ease, border-color 0.4s ease; animation:cardIn 0.55s cubic-bezier(.23,1,.32,1) both; }
        .gc:hover { transform:translateY(-12px) scale(1.025); box-shadow:0 30px 70px rgba(0,0,0,0.55),0 0 0 1px rgba(142,207,216,0.25),0 0 40px rgba(142,207,216,0.08),inset 0 1px 0 rgba(255,255,255,0.25); border-color:rgba(142,207,216,0.3); }
        .gc-blob { position:absolute; border-radius:50%; pointer-events:none; transition:filter 0.5s ease, opacity 0.5s ease; }
        .gc:hover .gc-blob { filter:blur(10px) brightness(1.8) !important; opacity:0.9 !important; }
        .gc-light { position:absolute; width:160px; height:160px; border-radius:50%; background:radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 65%); pointer-events:none; transform:translate(-50%,-50%); transition:opacity 0.3s ease; opacity:0; z-index:3; }
        .gc:hover .gc-light { opacity:1; }
        .gc-glass { position:absolute; inset:0; background:rgba(5,5,15,0.38); backdrop-filter:blur(22px) saturate(160%); -webkit-backdrop-filter:blur(22px) saturate(160%); z-index:1; }
        .gc-sheen { position:absolute; top:0; left:8%; right:8%; height:1px; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.55),transparent); z-index:4; opacity:0.6; transition:opacity 0.3s; }
        .gc:hover .gc-sheen { opacity:1; }
        .gc-edge { position:absolute; left:0; top:10%; bottom:10%; width:1px; background:linear-gradient(to bottom,transparent,rgba(255,255,255,0.2),transparent); z-index:4; }
        .gc-content { position:relative; z-index:5; padding:1.4rem 1.3rem 1.3rem; display:flex; flex-direction:column; min-height:310px; gap:0.55rem; }
        .gc-btn { margin-top:auto; padding:0.6rem 0; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.15); border-radius:8px; color:rgba(255,255,255,0.65); font-family:'Aharoni','Arial Black',sans-serif; font-size:9px; letter-spacing:0.3em; font-weight:700; cursor:pointer; transition:all 0.3s ease; width:100%; backdrop-filter:blur(4px); }
        .gc:hover .gc-btn { background:rgba(142,207,216,0.08); border-color:rgba(142,207,216,0.4); color:#B8E8EE; box-shadow:0 0 20px rgba(142,207,216,0.1); }
        .gc-quickview { opacity:0; transform:translateY(4px); transition:opacity 0.3s ease, transform 0.3s ease; }
        .gc:hover .gc-quickview { opacity:1; transform:translateY(0); }
        .cards-row::-webkit-scrollbar{display:none}
        .cards-row{-ms-overflow-style:none;scrollbar-width:none}

        /* Brand tabs */
        .brand-tab { font-family:'Aharoni','Arial Black',sans-serif; font-size:0.8rem; letter-spacing:0.25em; font-weight:900; color:rgba(255,255,255,0.45); background:transparent; border:none; border-bottom:2px solid transparent; outline:none; cursor:pointer; padding:0.5rem 0; transition:all 0.25s; }
        .brand-tab.active { color:#F0EDE6; border-bottom-color:#B8E8EE; }
        .brand-tab:hover { color:rgba(255,255,255,0.8); }

        /* Modal */
        .modal-bg { position:fixed;inset:0; background:rgba(0,0,0,0.8); backdrop-filter:blur(10px); z-index:1000; display:flex;align-items:center;justify-content:center; padding:1.5rem; }
        .modal-box { position:relative; background:rgba(6,6,16,0.92); border:1px solid rgba(0,229,255,0.2); border-radius:18px; max-width:560px;width:100%;max-height:82vh; overflow-y:auto; padding:2.2rem; animation:modalIn 0.28s cubic-bezier(.23,1,.32,1) both; box-shadow:0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,229,255,0.1), inset 0 1px 0 rgba(255,255,255,0.08); }
        .modal-box::-webkit-scrollbar{width:3px}
        .modal-box::-webkit-scrollbar-track{background:transparent}
        .modal-box::-webkit-scrollbar-thumb{background:rgba(0,229,255,0.25);border-radius:2px}
        .fpill { font-family:monospace;font-size:10px;padding:4px 10px; color:rgba(255,255,255,0.85);letter-spacing:0.05em; transition:background 0.2s,border-color 0.2s; cursor:default;border-radius:5px; }
        .fpill:hover{background:rgba(0,229,255,0.18)!important;color:#fff;}

        /* Ripple */
        .ripple-el { position:absolute; width:30px;height:30px; border-radius:50%; background:rgba(0,229,255,0.35); transform:translate(-50%,-50%) scale(0); animation:rippleOut 0.65s ease forwards; pointer-events:none; z-index:10; }

        /* ═══ MOBILE-FIRST RESPONSIVE ═══ */
        @media (hover:none) {
          .gc-quickview { opacity:1 !important; transform:translateY(0) !important; }
          .gc-btn { background:rgba(0,229,255,0.1); border-color:rgba(142,207,216,0.3); color:#B8E8EE; }
          .gc:hover { transform:none; }
          .gc:active { transform:scale(0.97); }
        }
        .gc { width:82vw; min-height:265px; }
        .gc-content { padding:1rem 0.9rem 0.9rem; min-height:265px; }
        .cards-row { padding:0.7rem 1rem 2rem !important; margin-left:-1rem !important; margin-right:-1rem !important; gap:0.75rem !important; }
        .brand-tab { font-size:0.6rem; letter-spacing:0.1em; padding:0.32rem 0; }
        .modal-bg { padding:0 !important; align-items:flex-end !important; }
        .modal-box { padding:1.3rem; max-height:92vh; border-radius:22px 22px 0 0 !important; width:100% !important; max-width:100% !important; }
        .nav-desktop-links { display:none !important; }
        .nav-hamburger { display:flex !important; }
        @media (min-width:480px) {
          .gc { width:72vw; min-height:280px; }
          .gc-content { padding:1.1rem 1rem 1rem; min-height:280px; }
          .brand-tab { font-size:0.64rem; }
        }
        @media (min-width:600px) {
          .nav-desktop-links { display:flex !important; }
          .nav-hamburger { display:none !important; }
          .gc { width:54vw; }
          .cards-row { padding:0.8rem 1.4rem 2rem !important; margin-left:-1.4rem !important; margin-right:-1.4rem !important; gap:1rem !important; }
          .modal-bg { padding:1.2rem !important; align-items:center !important; }
          .modal-box { padding:1.8rem; max-height:85vh; border-radius:18px !important; max-width:540px !important; }
        }
        @media (min-width:768px) {
          .gc { width:42vw; }
          .modal-box { padding:2rem; max-width:560px !important; }
          .brand-tab { font-size:0.74rem; letter-spacing:0.2em; }
        }
        @media (min-width:1024px) {
          .gc { width:220px; min-height:310px; }
          .gc-content { padding:1.4rem 1.3rem 1.3rem; min-height:310px; }
          .cards-row { padding:0.8rem 2rem 2rem !important; margin-left:-2rem !important; margin-right:-2rem !important; gap:1.1rem !important; }
          .brand-tab { font-size:0.8rem; letter-spacing:0.25em; }
        }
      `}</style>

      <LiquidNav />
      <HarbourScroll />
      <ProductsSection />
      <ZAFSection />
      <AboutSection />
      <FindUsSection />
      <Footer />
    </main>
  )
}
function LiquidNav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Desktop nav */}
      <nav style={{ position: 'fixed', top: '1.2rem', left: '1.2rem', zIndex: 100, animation: 'navReveal 0.8s ease 0.3s both' }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '1.2rem', padding: '0.7rem 1.4rem', borderRadius: '100px', border: '1px solid rgba(0,229,255,0.18)', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderRadius: '100px', zIndex: 0 }} />
          <div style={{ position: 'absolute', width: 80, height: 80, borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,229,255,0.35) 0%,transparent 70%)', top: '-20px', left: '-10px', animation: 'blob1 6s ease-in-out infinite', filter: 'blur(4px)', zIndex: 1 }} />
          <div style={{ position: 'absolute', width: 70, height: 70, borderRadius: '50%', background: 'radial-gradient(circle,rgba(191,0,255,0.28) 0%,transparent 70%)', top: '-15px', right: '20px', animation: 'blob2 7s ease-in-out infinite', filter: 'blur(4px)', zIndex: 1 }} />
          <div style={{ position: 'absolute', width: 50, height: 50, borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,229,255,0.18) 0%,transparent 70%)', bottom: '-10px', left: '40%', animation: 'blob3 5s ease-in-out infinite', filter: 'blur(3px)', zIndex: 1 }} />
          <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(0,229,255,0.45),transparent)', zIndex: 2 }} />
          <div style={{ position: 'relative', zIndex: 3, display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
              <span style={{ fontFamily: "'Aharoni','Arial Black',sans-serif", fontWeight: 900, fontSize: 'clamp(7px,0.9vw,9px)', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.9)', whiteSpace: 'nowrap' }}>BIRKENHEAD</span>
              <span style={{ fontFamily: "'Aharoni','Arial Black',sans-serif", fontWeight: 700, fontSize: 'clamp(6px,0.75vw,8px)', letterSpacing: '0.35em', color: '#8ECFD8', whiteSpace: 'nowrap' }}>VAPE SHOP</span>
            </div>
            {/* Desktop links — hidden on mobile */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }} className="nav-desktop-links">
              <div style={{ width: 1, height: 22, background: 'rgba(255,255,255,0.1)', flexShrink: 0 }} />
              <a href="#products" className="nav-link">PRODUCTS</a>
              <span className="nav-dot" />
              <a href="#find-us" className="nav-link">FIND US</a>
            </div>
            {/* Hamburger — shown on mobile */}
            <button onClick={() => setOpen(o => !o)} className="nav-hamburger" aria-label="Menu"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', flexDirection: 'column', gap: 4, zIndex: 3, position: 'relative' }}>
              <span style={{ display: 'block', width: 18, height: 1.5, background: '#B8E8EE', borderRadius: 2, transition: 'transform 0.25s, opacity 0.25s', transform: open ? 'rotate(45deg) translate(4px,4px)' : 'none' }} />
              <span style={{ display: 'block', width: 14, height: 1.5, background: '#B8E8EE', borderRadius: 2, opacity: open ? 0 : 1, transition: 'opacity 0.25s' }} />
              <span style={{ display: 'block', width: 18, height: 1.5, background: '#B8E8EE', borderRadius: 2, transition: 'transform 0.25s', transform: open ? 'rotate(-45deg) translate(4px,-4px)' : 'none' }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {open && (
        <div style={{ position: 'fixed', top: '4.5rem', left: '1.2rem', zIndex: 99, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(20px)', border: '1px solid rgba(0,229,255,0.2)', borderRadius: 12, padding: '1.2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', animation: 'navReveal 0.2s ease both' }}>
          <a href="#products" className="nav-link" onClick={() => setOpen(false)} style={{ fontSize: 11, letterSpacing: '0.4em' }}>PRODUCTS</a>
          <div style={{ height: 1, background: 'rgba(255,255,255,0.08)' }} />
          <a href="#find-us" className="nav-link" onClick={() => setOpen(false)} style={{ fontSize: 11, letterSpacing: '0.4em' }}>FIND US</a>
          <div style={{ height: 1, background: 'rgba(255,255,255,0.08)' }} />
          <a href="https://wa.me/64223286322" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Aharoni','Arial Black',sans-serif", fontSize: 11, letterSpacing: '0.3em', color: '#25D366', textDecoration: 'none' }}>WHATSAPP ↗</a>
        </div>
      )}

      <style>{`
        .nav-desktop-links { display:none !important; }
        .nav-hamburger { display:flex !important; }
        @media (min-width:600px) {
          .nav-desktop-links { display:flex !important; }
          .nav-hamburger { display:none !important; }
        }
      `}</style>
    </>
  )
}


/* ─── Page 1: Harbour Bridge — Cinematic Scroll ──────────────── */
function HarbourScroll() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [loadPct, setLoadPct] = useState(0)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return

    const ctx = canvas.getContext('2d', { alpha: false })!
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'

    // ── Resize — pixel-perfect canvas at native DPR ──
    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
    }
    resize()
    window.addEventListener('resize', resize)

    // ── Draw — cached scale so no recalc every frame ──
    let lastW = 0, lastH = 0, lastIW = 0
    let cScale = 1, cX = 0, cY = 0
    const draw = (img: HTMLImageElement) => {
      if (!img?.complete || !img.naturalWidth) return
      const cw = window.innerWidth, ch = window.innerHeight
      if (cw !== lastW || ch !== lastH || img.naturalWidth !== lastIW) {
        cScale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
        cX = (cw - img.naturalWidth * cScale) / 2
        cY = (ch - img.naturalHeight * cScale) / 2
        lastW = cw; lastH = ch; lastIW = img.naturalWidth
      }
      ctx.drawImage(img, cX, cY, img.naturalWidth * cScale, img.naturalHeight * cScale)
    }

    // ── Preload — decode ahead for zero-jank frame switching ──
    const imgs: HTMLImageElement[] = new Array(FRAMES)
    let loadCount = 0
    for (let i = 0; i < FRAMES; i++) {
      const img = new Image()
      img.decoding = 'async'
      img.onload = () => {
        img.decode?.().catch(() => { })
        loadCount++
        setLoadPct(Math.round((loadCount / FRAMES) * 100))
        if (i === 0) draw(img)
      }
      img.src = getFrame(i)
      imgs[i] = img
    }

    // ── Nearest loaded frame ──
    const nearestLoaded = (n: number) => {
      const ni = Math.round(n)
      if (imgs[ni]?.complete) return ni
      for (let r = 1; r < FRAMES; r++) {
        if (ni - r >= 0 && imgs[ni - r]?.complete) return ni - r
        if (ni + r < FRAMES && imgs[ni + r]?.complete) return ni + r
      }
      return 0
    }

    // ── RAF interpolation — frames lerp for silk smooth motion ──
    let targetFrame = 0
    let currentFrame = 0
    let rafId = 0
    let lastDrawn = -1

    const rafLoop = () => {
      currentFrame += (targetFrame - currentFrame) * 0.12
      const fi = nearestLoaded(currentFrame)
      if (fi !== lastDrawn) { draw(imgs[fi]); lastDrawn = fi }
      rafId = requestAnimationFrame(rafLoop)
    }
    rafId = requestAnimationFrame(rafLoop)

    // ── GSAP timeline — scrub:true = zero lag, RAF handles smoothing ──
    const hero = document.getElementById('hero')
    const hint = document.getElementById('hint')
    const endText = document.getElementById('end-text')

    ScrollTrigger.normalizeScroll(false)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrap,
        start: 'top top',
        end: () => `+=${window.innerHeight * 3}`,  // frames play over 300vh, last 100vh hero stays locked
        scrub: true,
        onUpdate: (self) => { targetFrame = self.progress * (FRAMES - 1) },
      },
    })

    tl.to({}, { duration: 100 })
    if (hero) tl.to(hero, { opacity: 0, y: -60, ease: 'none', duration: 20 }, 0)
    if (hint) tl.to(hint, { opacity: 0, ease: 'none', duration: 12 }, 0)
    if (endText) {
      gsap.set(endText, { opacity: 0, y: 30 })
      tl.fromTo(endText, { opacity: 0, y: 30 }, { opacity: 1, y: 0, ease: 'none', duration: 15 }, 80)
    }

    // Brand reveals
    const brandReveals = [
      { name: 'WOTOFO', start: 22, end: 40, side: 'left' },
      { name: 'INMOOD', start: 40, end: 58, side: 'right' },
      { name: 'SLAPPLE', start: 58, end: 76, side: 'left' },
      { name: 'CLOUDYS', start: 76, end: 90, side: 'right' },
    ]
    brandReveals.forEach(({ name, start, end, side }) => {
      const el = document.getElementById(`brand-reveal-${name}`)
      if (!el) return
      const xIn = side === 'left' ? -30 : 30
      tl.fromTo(el, { opacity: 0, x: xIn }, { opacity: 1, x: 0, ease: 'none', duration: 5 }, start)
      tl.to(el, { opacity: 0, x: xIn, ease: 'none', duration: 5 }, end - 5)
    })

    return () => {
      cancelAnimationFrame(rafId)
      ScrollTrigger.getAll().forEach(t => t.kill())
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div ref={wrapRef} style={{ height: '500vh', position: 'relative', background: '#000' }}>

      {/* Loading bar */}
      {loadPct < 100 && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, height: 2, background: 'rgba(0,0,0,0.4)' }}>
          <div style={{ height: '100%', width: `${loadPct}%`, background: 'linear-gradient(90deg,#8ECFD8,#B8A0D0)', transition: 'width 0.12s ease' }} />
        </div>
      )}

      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />

        {/* Hero text */}
        <div id="hero" style={{ position: 'absolute', inset: 0, zIndex: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 1.5rem', pointerEvents: 'none' }}>
          <p style={{ fontFamily: "'Aharoni','Arial Black',sans-serif", color: 'rgba(142,207,216,0.7)', fontSize: 'clamp(9px,2vw,11px)', letterSpacing: '0.5em', marginBottom: 16, opacity: 0.7 }}>// Birkenhead, Auckland — Est. 2024</p>
          <h1 style={{ fontFamily: "'Aharoni','Arial Black',sans-serif", fontWeight: 900, lineHeight: 1, margin: 0 }}>
            <span style={{ display: 'block', fontSize: 'clamp(1.8rem,7vw,6rem)', color: '#fff', textShadow: '0 0 40px rgba(255,255,255,0.2)' }}>BIRKENHEAD</span>
            <span style={{ display: 'block', fontSize: 'clamp(2.5rem,11vw,9rem)', color: '#8ECFD8', textShadow: '0 0 60px rgba(142,207,216,0.5)' }}>VAPE</span>
            <span style={{ display: 'block', fontSize: 'clamp(1.8rem,7vw,6rem)', color: '#BF00FF', textShadow: '0 0 80px rgba(191,0,255,0.8)' }}>SHOP</span>
          </h1>
        </div>

        {/* Brand name reveals — alternating left/right scroll teaser */}
        {[
          { name: 'WOTOFO', sub: '25,000 PUFFS', color: '#00E5FF', start: 22, end: 40, side: 'left' },
          { name: 'INMOOD', sub: 'SWITCH · PRISM', color: '#BF00FF', start: 40, end: 58, side: 'right' },
          { name: 'SLAPPLE', sub: 'E-LIQUID 120ML', color: '#39d353', start: 58, end: 76, side: 'left' },
          { name: 'CLOUDYS', sub: 'NIC SALT 30ML', color: '#a78bfa', start: 76, end: 90, side: 'right' },
        ].map(b => (
          <div key={b.name} id={`brand-reveal-${b.name}`} style={{
            position: 'absolute',
            ...(b.side === 'left' ? { left: '2.5rem' } : { right: '2.5rem' }),
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 4, pointerEvents: 'none', opacity: 0,
            textAlign: b.side === 'right' ? 'right' : 'left',
          }}>
            <div style={{
              width: 2, height: 36, background: b.color,
              marginBottom: 10,
              marginLeft: b.side === 'right' ? 'auto' : 0,
              boxShadow: `0 0 16px ${b.color}cc`,
            }} />
            <p style={{
              fontFamily: "'Aharoni','Arial Black',sans-serif",
              fontSize: 9, letterSpacing: '0.45em',
              color: b.color, margin: '0 0 8px',
              opacity: 0.75,
              textShadow: `0 0 20px ${b.color}88`,
            }}>{b.sub}</p>
            <h3 style={{
              fontFamily: "'Aharoni','Arial Black',sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(1.8rem,4.5vw,3.5rem)',
              color: '#fff', margin: 0, lineHeight: 1,
              letterSpacing: '0.04em',
              textShadow: `0 0 40px ${b.color}80, 0 2px 20px rgba(0,0,0,0.9)`,
            }}>{b.name}</h3>
          </div>
        ))}

        {/* End text */}
        <div id="end-text" style={{ position: 'absolute', inset: 0, zIndex: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 1.5rem', pointerEvents: 'none', opacity: 0 }}>
          <h2 style={{ fontFamily: "'Aharoni','Arial Black',sans-serif", fontWeight: 900, lineHeight: 1, margin: 0 }}>
            <span style={{ display: 'block', fontSize: 'clamp(2.5rem,10vw,8rem)', color: '#fff', textShadow: '0 0 60px rgba(255,255,255,0.2)' }}>THE CLOUD</span>
            <span style={{ display: 'block', fontSize: 'clamp(2.5rem,10vw,8rem)', color: '#8ECFD8', textShadow: '0 0 60px rgba(142,207,216,0.5)' }}>HAS LANDED</span>
          </h2>
          <div style={{ display: 'flex', gap: '1rem', marginTop: 40, pointerEvents: 'auto', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="#products" style={{ padding: '1.2rem 3rem', border: '1px solid #fff', color: '#fff', fontFamily: "'Aharoni','Arial Black',sans-serif", fontSize: 'clamp(0.7rem,1.8vw,1rem)', letterSpacing: '0.25em', textDecoration: 'none', fontWeight: 700 }}>PRODUCTS +</a>
            <a href="#find-us" style={{ padding: '1.2rem 3rem', border: '1px solid #fff', color: '#fff', fontFamily: "'Aharoni','Arial Black',sans-serif", fontSize: 'clamp(0.7rem,1.8vw,1rem)', letterSpacing: '0.25em', textDecoration: 'none', fontWeight: 700 }}>FIND US +</a>
          </div>
        </div>

        {/* Scroll hint */}
        <div id="hint" style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 5, textAlign: 'center', pointerEvents: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <div style={{ fontFamily: "'Aharoni','Arial Black',sans-serif", color: 'rgba(240,237,230,0.25)', fontSize: 8, letterSpacing: '0.4em' }}>SCROLL TO EXPLORE</div>
          {/* Animated chevron arrows */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            {[0, 1, 2].map(i => (
              <svg key={i} width="16" height="10" viewBox="0 0 16 10" fill="none" style={{ animation: `chevronFade 1.5s ease-in-out ${i * 0.2}s infinite`, opacity: 0 }}>
                <path d="M1 1L8 8L15 1" stroke="rgba(142,207,216,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ))}
          </div>
          <style>{`
            @keyframes chevronFade {
              0%,100% { opacity:0; transform:translateY(-4px); }
              50%      { opacity:0.8; transform:translateY(2px); }
            }
          `}</style>
        </div>
      </div>
    </div>
  )
}

/* ─── Glass Liquid Card ───────────────────────────────────────── */
function GlassCard({ product, brandColor, index, onOpen }: {
  product: Product; brandColor: string; index: number; onOpen: (p: Product) => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const lightRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const rotRef = useRef({ rx: 0, ry: 0 })
  const isTouch = useRef(typeof window !== 'undefined' && window.matchMedia('(hover:none)').matches)

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch.current) return
    const card = cardRef.current
    if (!card) return
    const r = card.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    mouseRef.current = { x: (x / r.width - 0.5) * 2, y: (y / r.height - 0.5) * 2 }
    if (lightRef.current) { lightRef.current.style.left = `${x}px`; lightRef.current.style.top = `${y}px` }
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(circle at ${(x / r.width * 100).toFixed(1)}% ${(y / r.height * 100).toFixed(1)}%, ${brandColor}28 0%, transparent 60%)`
    }
  }, [brandColor])

  const onMouseEnter = () => {
    if (isTouch.current) return
    if (lightRef.current) lightRef.current.style.opacity = '1'
    cardRef.current?.querySelectorAll<HTMLDivElement>('.gc-blob').forEach(b => {
      b.style.filter = 'blur(10px) brightness(2.2)'
      b.style.opacity = '1'
    })
    const loop = () => {
      const { x, y } = mouseRef.current
      rotRef.current.rx += (y * 15 - rotRef.current.rx) * 0.1
      rotRef.current.ry += (x * 15 - rotRef.current.ry) * 0.1
      if (innerRef.current) {
        innerRef.current.style.transform = `perspective(700px) rotateX(${-rotRef.current.rx}deg) rotateY(${rotRef.current.ry}deg) scale3d(1.04,1.04,1.04)`
      }
      rafRef.current = requestAnimationFrame(loop)
    }
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(loop)
  }

  const onMouseLeave = () => {
    if (isTouch.current) return
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    if (lightRef.current) lightRef.current.style.opacity = '0'
    if (glowRef.current) glowRef.current.style.background = 'transparent'
    mouseRef.current = { x: 0, y: 0 }
    cardRef.current?.querySelectorAll<HTMLDivElement>('.gc-blob').forEach(b => {
      b.style.filter = ''; b.style.opacity = ''
    })
    const spring = () => {
      rotRef.current.rx += (0 - rotRef.current.rx) * 0.1
      rotRef.current.ry += (0 - rotRef.current.ry) * 0.1
      if (innerRef.current) innerRef.current.style.transform = `perspective(700px) rotateX(${-rotRef.current.rx}deg) rotateY(${rotRef.current.ry}deg) scale3d(1,1,1)`
      if (Math.abs(rotRef.current.rx) > 0.01 || Math.abs(rotRef.current.ry) > 0.01) rafRef.current = requestAnimationFrame(spring)
      else { rotRef.current = { rx: 0, ry: 0 }; if (innerRef.current) innerRef.current.style.transform = 'none' }
    }
    rafRef.current = requestAnimationFrame(spring)
  }

  // Touch — tap ripple + pop + open modal
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const t = e.touches[0]
    const r = card.getBoundingClientRect()
    // Liquid glow burst at touch point
    if (glowRef.current) {
      const x = ((t.clientX - r.left) / r.width * 100).toFixed(1)
      const y = ((t.clientY - r.top) / r.height * 100).toFixed(1)
      glowRef.current.style.background = `radial-gradient(circle at ${x}% ${y}%, ${brandColor}35 0%, transparent 65%)`
      setTimeout(() => { if (glowRef.current) glowRef.current.style.background = 'transparent' }, 400)
    }
    // Ripple
    const rip = document.createElement('div')
    rip.className = 'ripple-el'
    rip.style.left = `${t.clientX - r.left}px`
    rip.style.top = `${t.clientY - r.top}px`
    card.appendChild(rip)
    setTimeout(() => rip.remove(), 700)
    // Scale pop
    gsap.fromTo(innerRef.current, { scale: 0.97 }, { scale: 1.03, duration: 0.15, ease: 'power2.out', yoyo: true, repeat: 1 })
  }

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const r = card.getBoundingClientRect()
    const rip = document.createElement('div')
    rip.className = 'ripple-el'
    rip.style.left = `${e.clientX - r.left}px`
    rip.style.top = `${e.clientY - r.top}px`
    card.appendChild(rip)
    setTimeout(() => rip.remove(), 700)
    gsap.fromTo(innerRef.current, { scale: 0.96 }, { scale: 1.04, duration: 0.12, ease: 'power2.out', yoyo: true, repeat: 1 })
    onOpen(product)
  }

  const d1 = [5.5, 7, 6, 8, 5, 7.5, 6.5, 8.5, 5.8, 7.2, 6.2, 8.2, 5.3][index % 13]
  const d2 = [7, 5.5, 8, 6, 7.5, 5, 8.5, 6.5, 7.2, 5.8, 8.2, 6.2, 7.8][index % 13]
  const d3 = [6, 8, 5.5, 7, 6.5, 8.5, 5, 7.5, 6.2, 8.2, 5.3, 7.2, 6.8][index % 13]
  const d4 = [8, 6, 7, 5.5, 8.5, 6.5, 7.5, 5, 8.2, 6.2, 7.2, 5.3, 8.8][index % 13]

  return (
    <div ref={cardRef} className="gc" style={{ animationDelay: `${(index * 0.07).toFixed(2)}s`, transformStyle: 'preserve-3d' }}
      onMouseMove={onMouseMove} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart} onClick={onClick}>

      {/* Dynamic glow follows cursor */}
      <div ref={glowRef} style={{ position: 'absolute', inset: 0, zIndex: 0, borderRadius: 20, pointerEvents: 'none', transition: 'background 0.08s ease' }} />

      {/* Liquid blobs */}
      <div className="gc-blob" style={{ width: 130, height: 130, background: `radial-gradient(circle,${brandColor}50 0%,transparent 65%)`, top: -35, left: -25, animation: `liq1 ${d1}s ease-in-out infinite`, filter: 'blur(16px)', opacity: 0.7, zIndex: 0 }} />
      <div className="gc-blob" style={{ width: 110, height: 110, background: 'radial-gradient(circle,rgba(191,0,255,0.45) 0%,transparent 65%)', bottom: -20, right: -20, animation: `liq2 ${d2}s ease-in-out infinite`, filter: 'blur(14px)', opacity: 0.65, zIndex: 0 }} />
      <div className="gc-blob" style={{ width: 80, height: 80, background: 'radial-gradient(circle,rgba(0,229,255,0.3) 0%,transparent 65%)', top: '40%', left: '30%', animation: `liq3 ${d3}s ease-in-out infinite`, filter: 'blur(12px)', opacity: 0.5, zIndex: 0 }} />
      <div className="gc-blob" style={{ width: 60, height: 60, background: `radial-gradient(circle,${product.badgeColor}40 0%,transparent 65%)`, top: '15%', right: '10%', animation: `liq4 ${d4}s ease-in-out infinite`, filter: 'blur(10px)', opacity: 0.45, zIndex: 0 }} />

      <div className="gc-glass" />
      <div ref={lightRef} className="gc-light" style={{ opacity: 0, transition: 'opacity 0.3s' }} />
      <div className="gc-sheen" />
      <div className="gc-edge" />

      {/* 3D tilt inner wrapper */}
      <div ref={innerRef} style={{ position: 'relative', zIndex: 5, transformStyle: 'preserve-3d', willChange: 'transform' }}>
        <div className="gc-content">
          {/* Badge + flavour count + flavour colour tag */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: "'Aharoni','Arial Black',sans-serif", fontSize: 8, letterSpacing: '0.22em', padding: '3px 9px', color: product.badgeColor, background: product.badgeColor + '1a', border: `1px solid ${product.badgeColor}40`, borderRadius: 4 }}>{product.badge}</span>
            {product.flavours.length > 0 && <span style={{ fontFamily: "'Aharoni','Arial Black',sans-serif", fontSize: 8, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.08em' }}>{product.flavours.length} flavours</span>}
            {(() => { const t = getFlavourTag(product.flavours); return t ? <span style={{ fontFamily: "'Aharoni','Arial Black',sans-serif", fontSize: 7, letterSpacing: '0.2em', padding: '2px 7px', color: t.color, background: t.color + '15', border: `1px solid ${t.color}35`, borderRadius: 10 }}>{t.label}</span> : null })()}
          </div>
          <h3 style={{ fontFamily: "'Aharoni','Arial Black',sans-serif", fontWeight: 900, fontSize: 'clamp(0.62rem,1.1vw,0.76rem)', color: '#fff', lineHeight: 1.35, margin: 0, textShadow: '0 1px 6px rgba(0,0,0,0.6)' }}>{product.name}</h3>
          <p style={{ fontFamily: "'Aharoni','Arial Black',sans-serif", fontSize: 10, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.1em', margin: 0 }}>{product.puffs}</p>

          {/* ── Variant sub-cards ── */}
          {product.variants ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5, margin: '4px 0' }}>
              {product.variants.map((v) => (
                <div key={v.strength} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '6px 8px',
                  background: `${v.color}10`,
                  border: `1px solid ${v.color}30`,
                  borderRadius: 6,
                  gap: 8,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: v.color, flexShrink: 0, boxShadow: `0 0 6px ${v.color}` }} />
                    <span style={{ fontFamily: "'Aharoni','Arial Black',sans-serif", fontWeight: 900, fontSize: 10, color: '#fff', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{v.strength}</span>
                    <span style={{ fontFamily: "'Aharoni','Arial Black',sans-serif", fontSize: 7, color: `${v.color}cc`, letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{v.nicSalt}</span>
                  </div>
                  <span style={{ fontFamily: "'Aharoni','Arial Black',sans-serif", fontSize: 7, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.03em', textAlign: 'right', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 90 }}>{v.note}</span>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ fontFamily: "'Aharoni','Arial Black',sans-serif", fontSize: 9, color: 'rgba(255,255,255,0.4)', margin: 0, lineHeight: 1.5 }}>{product.nicotine}</p>
          )}

          {!product.variants && product.note ? <p style={{ fontFamily: "'Aharoni','Arial Black',sans-serif", fontSize: 8, color: 'rgba(255,255,255,0.32)', margin: 0, fontStyle: 'italic', lineHeight: 1.4 }}>{product.note}</p> : null}
          <p style={{ fontFamily: "'Aharoni','Arial Black',sans-serif", fontWeight: 900, fontSize: 'clamp(1.15rem,2.2vw,1.4rem)', color: brandColor, textShadow: `0 0 24px ${brandColor}70`, margin: 'auto 0 0', letterSpacing: '0.04em' }}>{product.price}</p>
          {/* Quick view — top 3 flavours, visible on hover via CSS */}
          {product.flavours.length > 0 && (
            <div className="gc-quickview" style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 'auto' }}>
              {product.flavours.slice(0, 3).map(f => (
                <span key={f} style={{ fontFamily: "'Aharoni','Arial Black',sans-serif", fontSize: 7, padding: '2px 7px', color: 'rgba(255,255,255,0.6)', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, whiteSpace: 'nowrap' }}>{f}</span>
              ))}
              {product.flavours.length > 3 && <span style={{ fontFamily: "'Aharoni','Arial Black',sans-serif", fontSize: 7, padding: '2px 7px', color: 'rgba(255,255,255,0.3)', background: 'transparent', borderRadius: 10 }}>+{product.flavours.length - 3} more</span>}
            </div>
          )}

          <button className="gc-btn">EXPLORE +</button>
        </div>
      </div>
    </div>
  )
}

/* ─── Product Modal ──────────────────────────────────────────── */
function ProductModal({ product, brandColor, onClose }: { product: Product; brandColor: string; onClose: () => void }) {
  const [showAll, setShowAll] = useState(false)
  const PREVIEW = 18

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{ position: 'absolute', top: 14, right: 14, width: 30, height: 30, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)', fontSize: 14, cursor: 'pointer', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Aharoni','Arial Black',sans-serif", transition: 'all 0.2s' }}>✕</button>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 18 }}>
          <span style={{ fontFamily: "'Aharoni','Arial Black',sans-serif", fontSize: 9, letterSpacing: '0.25em', padding: '3px 10px', color: product.badgeColor, background: product.badgeColor + '1a', border: `1px solid ${product.badgeColor}40`, borderRadius: 4 }}>{product.badge}</span>
          <span style={{ fontFamily: "'Aharoni','Arial Black',sans-serif", fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em' }}>{product.puffs}</span>
        </div>

        <h2 style={{ fontFamily: "'Aharoni','Arial Black',sans-serif", fontWeight: 900, fontSize: 'clamp(1rem,3vw,1.4rem)', color: '#fff', margin: '0 0 0.4rem', lineHeight: 1.2 }}>{product.name}</h2>
        <p style={{ fontFamily: "'Aharoni','Arial Black',sans-serif", fontWeight: 900, fontSize: 'clamp(1.4rem,4vw,1.9rem)', color: brandColor, textShadow: `0 0 30px ${brandColor}90`, margin: '0 0 1.6rem', letterSpacing: '0.04em' }}>{product.price}</p>

        <div style={{ height: 1, background: `linear-gradient(to right,${brandColor}50,transparent)`, marginBottom: '1.4rem' }} />

        <div style={{ marginBottom: '1rem' }}>
          <p style={{ fontFamily: "'Aharoni','Arial Black',sans-serif", fontSize: 9, letterSpacing: '0.35em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginBottom: 7 }}>Specifications</p>
          <p style={{ fontFamily: "'Aharoni','Arial Black',sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.8)', lineHeight: 1.75, margin: 0 }}>{product.specs}</p>
        </div>

        <div style={{ marginBottom: '1.4rem' }}>
          <p style={{ fontFamily: "'Aharoni','Arial Black',sans-serif", fontSize: 9, letterSpacing: '0.35em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginBottom: 10 }}>Nicotine</p>
          {product.variants ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {product.variants.map(v => (
                <div key={v.strength} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: `${v.color}0d`, border: `1px solid ${v.color}30`, borderRadius: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: v.color, boxShadow: `0 0 10px ${v.color}`, flexShrink: 0 }} />
                    <div>
                      <p style={{ fontFamily: "'Aharoni','Arial Black',sans-serif", fontWeight: 900, fontSize: 13, color: '#fff', margin: 0, letterSpacing: '0.05em' }}>{v.strength}</p>
                      <p style={{ fontFamily: "'Aharoni','Arial Black',sans-serif", fontSize: 10, color: v.color, margin: 0, letterSpacing: '0.1em' }}>{v.nicSalt}</p>
                    </div>
                  </div>
                  <p style={{ fontFamily: "'Aharoni','Arial Black',sans-serif", fontSize: 10, color: 'rgba(255,255,255,0.45)', margin: 0, textAlign: 'right', letterSpacing: '0.05em' }}>{v.note}</p>
                </div>
              ))}
            </div>
          ) : (
            <>
              <p style={{ fontFamily: "'Aharoni','Arial Black',sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.9)', margin: 0 }}>{product.nicotine}</p>
              {product.note && <p style={{ fontFamily: "'Aharoni','Arial Black',sans-serif", fontSize: 10, color: 'rgba(255,255,255,0.45)', fontStyle: 'italic', marginTop: 6, marginBottom: 0 }}>{product.note}</p>}
            </>
          )}
        </div>

        {product.flavours.length > 0 && (
          <div>
            <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: '1.4rem' }} />
            <p style={{ fontFamily: "'Aharoni','Arial Black',sans-serif", fontSize: 9, letterSpacing: '0.35em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginBottom: 14 }}>Available Flavours — {product.flavours.length} options</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
              {(showAll ? product.flavours : product.flavours.slice(0, PREVIEW)).map(f => (
                <span key={f} className="fpill" style={{ background: brandColor + '10', border: `1px solid ${brandColor}28` }}>{f}</span>
              ))}
              {product.flavours.length > PREVIEW && (
                <button onClick={() => setShowAll(!showAll)} style={{ fontFamily: "'Aharoni','Arial Black',sans-serif", fontSize: 10, padding: '4px 12px', color: 'rgba(255,255,255,0.7)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', borderRadius: 5 }}>
                  {showAll ? '▲ show less' : `+${product.flavours.length - PREVIEW} more`}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Flavour Tags ───────────────────────────────────────────── */
const FLAVOUR_TAGS: { keywords: string[]; label: string; color: string }[] = [
  { keywords: ['mint', 'menthol', 'spearmint', 'peppermint', 'cool', 'ice', 'icy', 'frost'], label: 'MENTHOL', color: '#00e5ff' },
  { keywords: ['tobacco', 'golden tobacco', 'nut tobacco', 'caramel tobacco'], label: 'TOBACCO', color: '#b8860b' },
  { keywords: ['mango', 'peach', 'pineapple', 'passionfruit', 'lychee', 'guava', 'tropical', 'kiwi'], label: 'TROPICAL', color: '#f59e0b' },
  { keywords: ['strawberry', 'blueberry', 'raspberry', 'grape', 'cherry', 'berry', 'berries', 'pomegranate', 'blackberry', 'watermelon'], label: 'FRUITY', color: '#e91e8c' },
  { keywords: ['lemon', 'lime', 'citrus', 'sour', 'orange'], label: 'CITRUS', color: '#84cc16' },
  { keywords: ['vanilla', 'custard', 'caramel', 'banana', 'cream'], label: 'SWEET', color: '#a78bfa' },
]

function getFlavourTag(flavours: string[]): { label: string; color: string } | null {
  if (!flavours.length) return null
  const all = flavours.join(' ').toLowerCase()
  let best = FLAVOUR_TAGS[3]
  let max = 0
  for (const tag of FLAVOUR_TAGS) {
    const count = tag.keywords.filter(k => all.includes(k)).length
    if (count > max) { max = count; best = tag }
  }
  return best
}

/* ─── Products Section — horizontal pin scroll ──────────────── */
function ProductsSection() {
  const [activeBrand, setActiveBrand] = useState(0)
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'POD' | 'DEVICE' | 'STARTER KIT' | 'E-LIQUID' | 'DISPOSABLE'>('ALL')
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState<Product | null>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  const brand = BRANDS[activeBrand]

  const filtered = brand.products.filter(p => {
    const catMatch = activeCategory === 'ALL' ||
      (activeCategory === 'POD' && (p.badge === 'POD' || p.badge === 'TWIN PACK')) ||
      (activeCategory === 'DISPOSABLE' && p.badge === 'DISPOSABLE') ||
      (activeCategory === 'E-LIQUID' && (p.badge === 'E-LIQUID' || p.badge === 'FREEBASE' || p.badge === 'NIC SALT')) ||
      p.badge === activeCategory
    if (!catMatch) return false
    if (!search.trim()) return true
    const q = search.toLowerCase()
    return p.name.toLowerCase().includes(q) ||
      p.flavours.some(f => f.toLowerCase().includes(q)) ||
      p.nicotine.toLowerCase().includes(q)
  })

  type CatKey = 'ALL' | 'POD' | 'DEVICE' | 'STARTER KIT' | 'E-LIQUID' | 'DISPOSABLE'
  const cats: Array<{ key: CatKey; label: string }> = [
    { key: 'ALL' as CatKey, label: `All (${brand.products.length})` },
    { key: 'DISPOSABLE' as CatKey, label: `Disposables (${brand.products.filter(p => p.badge === 'DISPOSABLE').length})` },
    { key: 'POD' as CatKey, label: `Pods (${brand.products.filter(p => p.badge === 'POD' || p.badge === 'TWIN PACK').length})` },
    { key: 'STARTER KIT' as CatKey, label: `Starter Kits (${brand.products.filter(p => p.badge === 'STARTER KIT').length})` },
    { key: 'DEVICE' as CatKey, label: `Devices (${brand.products.filter(p => p.badge === 'DEVICE').length})` },
    { key: 'E-LIQUID' as CatKey, label: `E-Liquid (${brand.products.filter(p => p.badge === 'E-LIQUID' || p.badge === 'FREEBASE' || p.badge === 'NIC SALT').length})` },
  ].filter(c => c.key === 'ALL' || parseInt(c.label.match(/\d+/)?.[0] || '0') > 0)

  useEffect(() => { setActiveCategory('ALL'); setSearch('') }, [activeBrand])

  // ── Horizontal pin scroll ──
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const pin = pinRef.current
    const cards = cardsRef.current
    if (!pin || !cards) return

    // Kill previous
    if (tweenRef.current) {
      tweenRef.current.scrollTrigger?.kill()
      tweenRef.current.kill()
      tweenRef.current = null
    }

    gsap.set(cards, { x: 0 })

    // Wait one frame for React to render cards
    const raf = requestAnimationFrame(() => {
      const w = cards.scrollWidth - pin.clientWidth
      if (w <= 0) return

      tweenRef.current = gsap.to(cards, {
        x: -w,
        ease: 'none',
        scrollTrigger: {
          trigger: pin,
          pin: true,
          start: 'top top',
          end: `+=${w}`,
          scrub: 0.5,
          anticipatePin: 1,
        },
      })
    })

    return () => {
      cancelAnimationFrame(raf)
      if (tweenRef.current) {
        tweenRef.current.scrollTrigger?.kill()
        tweenRef.current.kill()
        tweenRef.current = null
      }
    }
  }, [activeBrand, activeCategory, search, filtered.length])

  return (
    <>
      {modal && <ProductModal product={modal} brandColor={brand.color} onClose={() => setModal(null)} />}

      {/* Outer shell — handles blanket overlap positioning */}
      <div id="products" style={{ marginTop: '-100vh', position: 'relative', zIndex: 10 }}>

        {/* Pin target — this gets position:fixed by GSAP */}
        <div ref={pinRef} style={{ overflow: 'hidden', borderRadius: '28px 28px 0 0', background: '#000', position: 'relative' }}>

          {/* Video bg + overlays */}
          <video src="/skytower.mp4" autoPlay muted loop playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0, opacity: 0.55 }} />
          <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.25) 35%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.7) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', width: 600, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(142,207,216,0.04) 0%,transparent 70%)', top: '-5%', right: '0%', animation: 'floatOrb1 16s ease-in-out infinite', filter: 'blur(60px)' }} />
            <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(184,160,208,0.04) 0%,transparent 70%)', bottom: '5%', left: '-5%', animation: 'floatOrb2 20s ease-in-out infinite', filter: 'blur(60px)' }} />
          </div>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,rgba(142,207,216,0.6),rgba(184,160,208,0.5),transparent)', zIndex: 4 }} />

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 5, padding: 'clamp(3.5rem,6vh,5.5rem) clamp(1rem,3vw,2rem) clamp(1.5rem,3vh,3rem)' }}>

            {/* Heading */}
            <div style={{ maxWidth: 960, margin: '0 auto 1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                <div style={{ height: 1, width: 28, background: 'rgba(142,207,216,0.5)' }} />
                <p style={{ fontFamily: "'Aharoni','Arial Black',sans-serif", fontSize: 10, letterSpacing: '0.55em', color: 'rgba(240,237,230,0.5)', textTransform: 'uppercase', margin: 0 }}>02 — Our Products</p>
              </div>
              <h2 className="products-heading" style={{ fontFamily: "'Aharoni','Arial Black',sans-serif", fontWeight: 900, fontSize: 'clamp(2rem,6vw,4.5rem)', color: '#fff', lineHeight: 1, margin: '0 0 0.6rem', letterSpacing: '-0.02em', textShadow: '0 2px 20px rgba(0,0,0,0.7)' }}>
                What We <span style={{ color: '#8ECFD8', textShadow: '0 0 40px rgba(142,207,216,0.3)' }}>Stock</span>
              </h2>
              <div className="products-warning" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '6px 14px', border: '1px solid rgba(234,179,8,0.4)', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', borderRadius: 6 }}>
                <span style={{ color: '#fbbf24', fontSize: 12 }}>⚠</span>
                <p style={{ fontFamily: "'Aharoni','Arial Black',sans-serif", fontSize: 10, color: 'rgba(255,255,255,0.75)', margin: 0 }}>Vaping products may contain nicotine · 18+ only</p>
              </div>
            </div>

            {/* Brand tabs */}
            <div className="brand-tabs-row" style={{ maxWidth: 960, margin: '0 auto 1rem', display: 'flex', gap: '1.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
              {BRANDS.map((b, i) => (
                <button key={b.name} className={`brand-tab${activeBrand === i ? ' active' : ''}`} onClick={() => setActiveBrand(i)}
                  style={{ borderBottom: activeBrand === i ? `2px solid ${b.color}` : '2px solid transparent', color: activeBrand === i ? '#fff' : 'rgba(255,255,255,0.35)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  {b.name}
                  <span style={{ fontFamily: "'Aharoni','Arial Black',sans-serif", fontSize: 10, marginLeft: 2, color: 'rgba(255,255,255,0.3)' }}>{b.products.length}</span>
                </button>
              ))}
            </div>

            {/* Search + filters */}
            <div style={{ maxWidth: 960, margin: '0 auto 1rem', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              <div style={{ position: 'relative', maxWidth: 400 }}>
                <svg style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', opacity: 0.4, pointerEvents: 'none' }} width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="8" stroke="#fff" strokeWidth="2" />
                  <path d="m21 21-4.35-4.35" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <input type="text" placeholder="Search flavour, name or strength..." value={search} onChange={e => setSearch(e.target.value)}
                  style={{ width: '100%', paddingLeft: 36, paddingRight: 36, paddingTop: 9, paddingBottom: 9, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, color: '#fff', fontFamily: "'Aharoni','Arial Black',sans-serif", fontSize: 11, letterSpacing: '0.05em', outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => (e.target.style.borderColor = 'rgba(142,207,216,0.6)')} onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.15)')} />
                {search && <button onClick={() => setSearch('')} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: 14, padding: 4 }}>✕</button>}
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {cats.map(c => (
                  <button key={c.key} onClick={() => setActiveCategory(c.key)} style={{ fontFamily: "'Aharoni','Arial Black',sans-serif", fontSize: 9, letterSpacing: '0.25em', padding: '5px 14px', borderRadius: 20, border: '1px solid', borderColor: activeCategory === c.key ? brand.color : 'rgba(255,255,255,0.15)', background: activeCategory === c.key ? brand.color + '22' : 'rgba(0,0,0,0.3)', color: activeCategory === c.key ? brand.color : 'rgba(255,255,255,0.45)', cursor: 'pointer', backdropFilter: 'blur(8px)', transition: 'all 0.2s' }}>{c.label}</button>
                ))}
              </div>
              <p style={{ fontFamily: "'Aharoni','Arial Black',sans-serif", fontSize: 9, color: 'rgba(240,237,230,0.25)', margin: 0, letterSpacing: '0.2em' }}>
                {filtered.length} PRODUCT{filtered.length !== 1 ? 'S' : ''}{search ? ` MATCHING "${search.toUpperCase()}"` : ''} — SCROLL TO BROWSE →
              </p>
            </div>

            {/* Cards — horizontal scroll track */}
            <div ref={cardsRef} style={{ display: 'flex', gap: '1.1rem', padding: '0.5rem 2rem 1.5rem' }}>
              <div style={{ flexShrink: 0, width: 8 }} />
              {filtered.length > 0 ? filtered.map((p, i) => (
                <GlassCard key={p.name} product={p} brandColor={brand.color} index={i} onOpen={setModal} />
              )) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: 300, padding: '3rem', textAlign: 'center', gap: 12 }}>
                  <p style={{ fontFamily: "'Aharoni','Arial Black',sans-serif", fontSize: 28, color: 'rgba(255,255,255,0.1)', margin: 0 }}>🔍</p>
                  <p style={{ fontFamily: "'Aharoni','Arial Black',sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.3em', margin: 0 }}>NO PRODUCTS FOUND</p>
                  <button onClick={() => { setSearch(''); setActiveCategory('ALL') }} style={{ fontFamily: "'Aharoni','Arial Black',sans-serif", fontSize: 9, letterSpacing: '0.3em', color: '#B8E8EE', background: 'none', border: '1px solid rgba(142,207,216,0.3)', padding: '6px 16px', borderRadius: 20, cursor: 'pointer' }}>CLEAR FILTERS</button>
                </div>
              )}
              <div style={{ flexShrink: 0, width: 8 }} />
            </div>

            {/* Health warning */}
            <div style={{ maxWidth: 960, margin: '1rem auto 0', padding: '0.8rem 1.2rem', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(12px)', border: '1px solid rgba(191,0,255,0.25)', borderRadius: 8, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{ width: 1, alignSelf: 'stretch', minHeight: '2rem', background: 'rgba(191,0,255,0.4)', flexShrink: 0 }} />
              <p style={{ fontFamily: "'Aharoni','Arial Black',sans-serif", fontSize: 10, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, margin: 0 }}>
                <span style={{ color: '#a78bfa', fontWeight: 700, letterSpacing: '0.15em' }}>Important Notice · </span>
                All products sold at Birkenhead Vape Shop are for use by persons aged 18+ only.
                Regulated under the Smokefree Environments and Regulated Products Act 1990.
                Vaping is not without risk. Visit <span style={{ color: '#8ECFD8' }}>health.govt.nz</span> for more information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

/* ─── ZAF Data ───────────────────────────────────────────────── */
const ZAF_FLAVOURS = [
  { name: 'BLUEBERRY', accent: '#3a7bd5', tint: 'rgba(20,50,120,0.6)', img: '/zaf/blueberry.png' },
  { name: 'PEACH', accent: '#d4724a', tint: 'rgba(120,50,20,0.6)', img: '/zaf/peach.png' },
  { name: 'WATERMELON', accent: '#e74c3c', tint: 'rgba(100,10,15,0.6)', img: '/zaf/watermelon.png' },
  { name: 'MANGO', accent: '#f0a500', tint: 'rgba(100,60,0,0.6)', img: '/zaf/mango.png' },
  { name: 'GRAPE', accent: '#8e44ad', tint: 'rgba(50,10,90,0.6)', img: '/zaf/grape.png' },
  { name: 'PEPPERMINT', accent: '#2ecc71', tint: 'rgba(10,80,35,0.6)', img: '/zaf/peppermint.png' },
  { name: 'CITRUS', accent: '#e67e22', tint: 'rgba(100,45,0,0.6)', img: '/zaf/citrus.png' },
  { name: 'BLUEBERRY RASPBERRY', accent: '#e91e8c', tint: 'rgba(100,0,60,0.6)', img: '/zaf/blueberry-raspberry.png' },
  { name: 'MINT', accent: '#1abc9c', tint: 'rgba(10,70,55,0.6)', img: '/zaf/mint.png' },
  { name: 'BERRIES', accent: '#c0392b', tint: 'rgba(90,10,40,0.6)', img: '/zaf/berries.png' },
]



/* ─── ZAF Section — Pinned scroll + autoplay video bg ────────── */
function ZAFSection() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)

  const fl = ZAF_FLAVOURS[current]
  const F = "'Aharoni','Arial Black',Arial,sans-serif"

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const wrap = wrapRef.current
    if (!wrap) return

    let lastIdx = -1

    ScrollTrigger.create({
      trigger: wrap,
      pin: true,
      start: 'top top',
      end: () => `+=${window.innerHeight * 5}`,
      scrub: 0.3,
      anticipatePin: 1,
      onUpdate: (self) => {
        const idx = Math.min(ZAF_FLAVOURS.length - 1, Math.floor(self.progress * ZAF_FLAVOURS.length))
        if (idx !== lastIdx) {
          lastIdx = idx
          setCurrent(idx)
          const nfl = ZAF_FLAVOURS[idx]

          if (bgRef.current) {
            gsap.to(bgRef.current, {
              background: `radial-gradient(ellipse 80% 70% at 60% 55%, ${nfl.tint} 0%, rgba(0,0,0,0.95) 65%, #000 100%)`,
              duration: 0.6, ease: 'power2.inOut',
            })
          }
          if (nameRef.current) {
            gsap.fromTo(nameRef.current,
              { opacity: 0, x: -20 },
              { opacity: 1, x: 0, duration: 0.4, ease: 'power3.out' },
            )
          }
        }
      },
    })

    if (bgRef.current) {
      gsap.set(bgRef.current, {
        background: `radial-gradient(ellipse 80% 70% at 60% 55%, ${ZAF_FLAVOURS[0].tint} 0%, rgba(0,0,0,0.95) 65%, #000 100%)`,
      })
    }

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <div id="zaf" ref={wrapRef} style={{ height: '100vh', position: 'relative', overflow: 'hidden', background: '#000' }}>

      {/* Morphing colour bg */}
      <div ref={bgRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }} />

      {/* Video — autoplay loop, screen blend makes black = transparent */}
      <video
        autoPlay muted loop playsInline preload="auto"
        src="https://res.cloudinary.com/dejnpr2ds/video/upload/v1776895744/Zaf-Conveyor_rzfsrl.mp4"
        style={{
          position: 'absolute', right: 0, top: 0,
          width: 'clamp(50%,60vw,65%)', height: '100%',
          objectFit: 'cover', zIndex: 2,
          mixBlendMode: 'screen', opacity: 0.9,
          maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 15%, black 35%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 15%, black 35%)',
        }}
      />

      {/* Subtle bottom fade only */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '20%', zIndex: 3, pointerEvents: 'none',
        background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)',
      }} />

      {/* Giant watermark */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none', overflow: 'hidden',
      }}>
        <span style={{
          fontFamily: F, fontWeight: 900,
          fontSize: 'clamp(6rem,22vw,22vw)',
          color: fl.accent, opacity: 0.04,
          letterSpacing: '-0.04em', lineHeight: 0.85,
          whiteSpace: 'nowrap', userSelect: 'none',
          textTransform: 'uppercase',
          transition: 'color 0.6s ease',
        }}>
          {fl.name.split(' ')[0]}
        </span>
      </div>

      {/* ── Header bar ── */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 6, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: 'clamp(1.5rem,3vh,2.5rem) clamp(1.5rem,4vw,3rem)' }}>
        <div>
          <p style={{ fontFamily: F, fontWeight: 900, fontSize: 'clamp(1rem,2vw,1.3rem)', color: '#F0EDE6', margin: 0, letterSpacing: '0.15em', textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}>ZAF⚡</p>
          <p style={{ fontFamily: F, fontSize: 8, color: 'rgba(240,237,230,0.35)', letterSpacing: '0.4em', margin: '3px 0 0' }}>ZERO TO ABSOLUTE FOCUS</p>
        </div>
        <div style={{ display: 'flex', gap: 'clamp(1rem,3vw,2rem)', alignItems: 'center' }}>
          {['ENERGY', 'FOCUS', 'MOOD'].map(t => (
            <span key={t} style={{ fontFamily: F, fontSize: 'clamp(7px,0.85vw,9px)', color: 'rgba(240,237,230,0.35)', letterSpacing: '0.3em' }}>{t}</span>
          ))}
        </div>
        <div style={{ fontFamily: F, fontSize: 9, color: 'rgba(240,237,230,0.35)', border: '1px solid rgba(255,255,255,0.12)', padding: '5px 12px', borderRadius: 20, letterSpacing: '0.2em', backdropFilter: 'blur(8px)', background: 'rgba(0,0,0,0.25)' }}>
          75MG CAFFEINE
        </div>
      </div>

      {/* ── Left panel — flavour info ── */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0,
        width: 'clamp(300px,50vw,55%)',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        padding: 'clamp(1.5rem,4vw,3.5rem)',
        zIndex: 6,
      }}>
        <div style={{ width: 32, height: 2, background: fl.accent, marginBottom: 18, transition: 'background 0.5s ease', boxShadow: `0 0 12px ${fl.accent}60` }} />

        <p style={{ fontFamily: F, fontSize: 'clamp(9px,1vw,11px)', color: 'rgba(240,237,230,0.35)', letterSpacing: '0.5em', margin: '0 0 10px' }}>
          {String(current + 1).padStart(2, '0')} / {String(ZAF_FLAVOURS.length).padStart(2, '0')}
        </p>

        <div ref={nameRef}>
          <h2 style={{
            fontFamily: F, fontWeight: 900, margin: 0, lineHeight: 1.05,
            fontSize: fl.name.length > 12 ? 'clamp(1.5rem,4vw,3rem)' : 'clamp(2.2rem,6vw,5rem)',
            color: '#F0EDE6',
            letterSpacing: fl.name.length > 12 ? '0.02em' : '-0.03em',
            textShadow: `0 0 50px ${fl.accent}50, 0 4px 30px rgba(0,0,0,0.5)`,
          }}>
            {fl.name}
          </h2>
        </div>

        <p style={{ fontFamily: F, fontWeight: 900, fontSize: 'clamp(1.4rem,3.5vw,2.5rem)', color: '#c9a96e', margin: '0.6rem 0 0', letterSpacing: '0.05em', textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}>
          $12.90
        </p>

        <div style={{ width: 60, height: 1, background: 'rgba(255,255,255,0.08)', margin: 'clamp(1rem,2.5vh,2rem) 0' }} />

        <div style={{ display: 'flex', gap: 'clamp(1.5rem,4vw,3rem)', flexWrap: 'wrap', marginBottom: 'clamp(1rem,2vh,1.5rem)' }}>
          {[
            { val: '75mg', label: 'CAFFEINE' },
            { val: '20', label: 'POUCHES' },
            { val: '0g', label: 'SUGAR' },
          ].map(s => (
            <div key={s.label}>
              <p style={{ fontFamily: F, fontWeight: 900, fontSize: 'clamp(1rem,2.5vw,1.6rem)', color: fl.accent, margin: 0, letterSpacing: '-0.01em', transition: 'color 0.5s' }}>{s.val}</p>
              <p style={{ fontFamily: F, fontSize: 'clamp(7px,0.8vw,9px)', color: 'rgba(240,237,230,0.3)', letterSpacing: '0.3em', margin: '2px 0 0' }}>{s.label}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 'clamp(0.8rem,1.5vh,1rem)' }}>
          {['NO NICOTINE', 'NO TOBACCO', 'ZERO CALORIES'].map(tag => (
            <span key={tag} style={{
              fontFamily: F, fontSize: 'clamp(7px,0.8vw,8px)', letterSpacing: '0.25em',
              padding: '4px 12px', borderRadius: 20,
              color: 'rgba(240,237,230,0.4)',
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.03)',
            }}>{tag}</span>
          ))}
        </div>

        <div style={{ padding: '8px 16px', border: `1px solid ${fl.accent}35`, background: `${fl.accent}08`, borderRadius: 4, alignSelf: 'flex-start', transition: 'all 0.5s ease' }}>
          <p style={{ fontFamily: F, fontSize: 'clamp(7px,0.8vw,8px)', color: fl.accent, letterSpacing: '0.3em', margin: 0, transition: 'color 0.5s' }}>BIRKENHEAD VAPE SHOP · AUCKLAND</p>
        </div>
      </div>

      {/* ── Progress dots ── */}
      <div style={{ position: 'absolute', bottom: 'clamp(1.5rem,3vh,2.5rem)', left: 'clamp(1.5rem,4vw,3.5rem)', display: 'flex', gap: 6, alignItems: 'center', zIndex: 6 }}>
        {ZAF_FLAVOURS.map((f, i) => (
          <div key={i} style={{
            height: 3,
            flex: i === current ? 3 : 1,
            background: i === current ? fl.accent : 'rgba(255,255,255,0.12)',
            borderRadius: 2,
            transition: 'all 0.4s cubic-bezier(.23,1,.32,1)',
          }} />
        ))}
      </div>

      {/* Scroll hint */}
      <div style={{ position: 'absolute', bottom: 'clamp(1.5rem,3vh,2.5rem)', right: 'clamp(1.5rem,4vw,3rem)', zIndex: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <p style={{ fontFamily: F, fontSize: 8, color: 'rgba(240,237,230,0.25)', letterSpacing: '0.4em', margin: 0 }}>
          SCROLL TO EXPLORE
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          {[0, 1, 2].map(i => (
            <svg key={i} width="14" height="8" viewBox="0 0 16 10" fill="none" style={{ animation: `chevronFade 1.5s ease-in-out ${i * 0.2}s infinite`, opacity: 0 }}>
              <path d="M1 1L8 8L15 1" stroke={fl.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ))}
        </div>
      </div>
    </div>
  )
}
