param(
    [Parameter(Mandatory=$true)]
    [string]$DestPath,

    [Parameter(Mandatory=$true)]
    [string]$SrcPath
)

$dest = Join-Path $DestPath "com.anonywho.mod"

# Create destination if needed
New-Item -ItemType Directory -Path $dest -Force | Out-Null

# Copy modinfo.json
Copy-Item -Path (Join-Path $SrcPath "modinfo.json") -Destination $dest -Force

# Copy ui folder
Copy-Item -Path (Join-Path $SrcPath "ui") -Destination $dest -Recurse -Force

Write-Host "Synced to: $dest" -ForegroundColor Green
