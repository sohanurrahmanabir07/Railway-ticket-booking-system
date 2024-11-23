<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;

class Handler extends ExceptionHandler
{
    /**
     * A list of exception types with their corresponding custom log levels.
     *
     * @var array<class-string<\Throwable>, \Psr\Log\LogLevel::*>
     */
    protected $levels = [
        //
    ];

    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<\Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
            // Log or report the exception if needed
        });
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Throwable $exception
     * @return \Illuminate\Http\JsonResponse|\Symfony\Component\HttpFoundation\Response
     */
    // public function render($request, Throwable $exception)
    // {
    //     // Handle JWT-specific exceptions
    //     if ($exception instanceof TokenInvalidException) {
    //         return response()->json(['error' => 'The token is invalid'], 401);
    //     }

    //     if ($exception instanceof TokenExpiredException) {
    //         return response()->json(['error' => 'The token has expired'], 401);
    //     }

    //     if ($exception instanceof JWTException) {
    //         return response()->json(['error' => 'Token not provided'], 401);
    //     }

    //     // Fallback to the default exception handler for other exceptions
    //     return parent::render($request, $exception);
    // }
    public function render($request, Throwable $e)
    {
        if($e instanceof \Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException){
            return response()->json([$e->getMessage()], $e->getStatusCode());
        }
        return parent::render($request, $e);
    }
}
