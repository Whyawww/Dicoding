<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vacancy extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

protected function casts(): array
{
    return [
        'is_remote'    => 'boolean',
        'show_salary'  => 'boolean',
        'active_until' => 'date:Y-m-d',
        'min_salary'   => 'float',
        'max_salary'   => 'float',
    ];
}
}
