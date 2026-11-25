<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Data Hewan</title>
</head>
<body>

<?php
require_once 'Kucing.php';
require_once 'Anjing.php';

$kucing = new Kucing();
$kucing->setNama("Oyen");
$kucing->setUmur(3);

$anjing = new Anjing();
$anjing->setNama("Coki");
$anjing->setUmur(5);
?>

<h1>Data Hewan</h1>

<h2>Kucing</h2>
<table border="1" cellpadding="8" cellspacing="0">
    <tr>
        <th>Nama</th>
        <td><?= htmlspecialchars($kucing->getNama()) ?></td>
    </tr>
    <tr>
        <th>Umur</th>
        <td><?= $kucing->getUmur() ?> tahun</td>
    </tr>
    <tr>
        <th>Jenis</th>
        <td>Kucing</td>
    </tr>
    <tr>
        <th>Suara</th>
        <td><?= htmlspecialchars($kucing->getSuara()) ?></td>
    </tr>
</table>

<br>

<h2>Anjing</h2>
<table border="1" cellpadding="8" cellspacing="0">
    <tr>
        <th>Nama</th>
        <td><?= htmlspecialchars($anjing->getNama()) ?></td>
    </tr>
    <tr>
        <th>Umur</th>
        <td><?= $anjing->getUmur() ?> tahun</td>
    </tr>
    <tr>
        <th>Jenis</th>
        <td>Anjing</td>
    </tr>
    <tr>
        <th>Suara</th>
        <td><?= htmlspecialchars($anjing->getSuara()) ?></td>
    </tr>
</table>

</body>
</html>