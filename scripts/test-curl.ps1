$key = "AIzaSyBRPzF3MI8E2i9JN2tXVR_Sqhm6K-XcSsk"
$url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=$key"
$body = @{
    contents = @(
        @{
            parts = @(
                @{ text = "Hello" }
            )
        }
    )
} | ConvertTo-Json -Depth 5

try {
    Write-Host "Testing Gemini API via raw HTTP request..."
    $response = Invoke-RestMethod -Uri $url -Method Post -Body $body -ContentType "application/json"
    Write-Host "✅ SUCCESS!"
    Write-Host ($response.candidates[0].content.parts[0].text)
} catch {
    Write-Host "❌ FAILED"
    Write-Host $_.Exception.Message
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader $_.Exception.Response.GetResponseStream()
        Write-Host $reader.ReadToEnd()
    }
}
