# MIAV Project Setup Guide

## Step 1: Copy Generated Images

Open PowerShell in the project folder and run:

```powershell
powershell -ExecutionPolicy Bypass -File ".\setup-images.ps1"
```

## Step 2: Install Dependencies

```bash
npm install
```

## Step 3: Run the Dev Server

```bash
npm run dev
```

## Step 4: Generate Missing Images (Optional)

The image generation quota was reached. The following portfolio images need to be added manually or will show placeholders:

**Exterior Design** (missing 4 images):
- `public/images/exterior/exterior-2.png` — Desert modern home
- `public/images/exterior/exterior-3.png` — Contemporary urban townhouse
- `public/images/exterior/exterior-4.png` — Luxury pool deck
- `public/images/exterior/exterior-5.png` — Minimalist rooftop garden

**Office Design** (missing 5 images):
- `public/images/office/office-1.png` — Bright co-working area
- `public/images/office/office-2.png` — Futuristic meeting pod
- `public/images/office/office-3.png` — Employee break lounge
- `public/images/office/office-4.png` — Minimalist reception area
- `public/images/office/office-5.png` — Focus zone pods

Replace these placeholder files with real images when available.
